package net.foreworld.speedt.protocol;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Protocol implements ProtocolContext {
	private final Reader reader;
	private final Writer writer;
	private Thread senderThread;
	private Thread receiverThread;
	private SenderTask senderTask;
	private ReceiverTask receiverTask;

	private final BlockingQueue<ClientToServerMessage> queue;

	public Protocol(Reader reader, Writer writer) {
		this.reader = reader;
		this.writer = writer;
		queue = new LinkedBlockingQueue<ClientToServerMessage>();
	}

	public void start() {
		receiverTask = new ReceiverTask(reader, this);
		receiverThread = new Thread(receiverTask, "SpeedTSeceiverThread");
		receiverThread.start();
		// TODO
		senderTask = new SenderTask(writer, this);
		senderThread = new Thread(senderTask, "SpeedTSenderTask");
		senderThread.start();
	}

	public synchronized void cleanUpSession() {
		if (null != senderTask) {
			senderTask.stopTask();
		}
		if (null != receiverTask) {
			receiverTask.stopTask();
		}
		if (null != senderTask) {
			try {
				senderThread.join(1000);
			} catch (InterruptedException e) {
				// TODO
			}
			senderTask = null;
		}
		if (null != receiverTask) {
			try {
				receiverThread.join(1000);
			} catch (InterruptedException e) {
				// TODO
			}
			receiverTask = null;
		}
	}

	@Override
	public void putClientToServerMessage(ClientToServerMessage message) {
		queue.offer(message);
	}

	@Override
	public ClientToServerMessage getClientToServerMessage()
			throws InterruptedException {
		return queue.poll(1, TimeUnit.SECONDS);
	}
}

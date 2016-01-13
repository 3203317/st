package net.foreworld.speedt.protocol;

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

	public Protocol(Reader reader, Writer writer) {
		this.reader = reader;
		this.writer = writer;
	}

	public void start() {
		receiverTask = new ReceiverTask(reader, this);
		receiverThread = new Thread(receiverTask, "receiverThread");
		receiverThread.start();
		// TODO
		senderTask = new SenderTask(writer, this);
		senderThread = new Thread(senderTask, "senderTask");
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
}

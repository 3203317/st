package net.foreworld.speedt.protocol;

import net.foreworld.speedt.transport.Reader;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class ReceiverTask implements Runnable {

	private final Reader reader;
	private volatile boolean isRunning = false;
	private final ProtocolContext context;

	public ReceiverTask(Reader reader, ProtocolContext context) {
		this.reader = reader;
		this.context = context;
	}

	@Override
	public void run() {
		isRunning = true;
		while (isRunning) {
			// TODO
		}
	}

	public void stopTask() {
		isRunning = false;
	}
}
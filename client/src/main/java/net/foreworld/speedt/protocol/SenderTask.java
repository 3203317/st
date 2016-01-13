package net.foreworld.speedt.protocol;

import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class SenderTask implements Runnable {

	private final Writer writer;
	private volatile boolean isRunning = false;
	private final ProtocolContext context;

	public SenderTask(Writer writer, ProtocolContext context) {
		this.writer = writer;
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
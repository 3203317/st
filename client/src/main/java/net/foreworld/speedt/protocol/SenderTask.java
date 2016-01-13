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

	public SenderTask(Writer writer) {
		this.writer = writer;
	}

	@Override
	public void run() {
		isRunning = true;
		while (isRunning) {
			// TODO
		}
	}
}

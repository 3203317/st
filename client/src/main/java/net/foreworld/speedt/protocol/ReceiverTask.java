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

	public ReceiverTask(Reader reader) {
		this.reader = reader;
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
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
			try {
				ClientToServerMessage message = context
						.getClientToServerMessage();
				if (null == message)
					break;
				// TODO
				byte[] b = message.getRoute().getBytes();
				writer.write(b);
				writer.flush();
			} catch (InterruptedException e) {
				e.printStackTrace();
				if (isRunning)
					context.cleanUpSession();
				stopTask();
			} catch (Exception e) {
				if (isRunning)
					context.cleanUpSession();
				stopTask();
			}
		}
	}

	public void stopTask() {
		isRunning = false;
	}
}
package net.foreworld.speedt;

import java.util.logging.Logger;

import net.foreworld.speedt.client.Client;
import net.foreworld.speedt.server.Server;
import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class TestTask implements Runnable {

	private final Logger logger;
	private Server server;

	public TestTask() {
		logger = Logger.getLogger(getClass().getName());
	}

	@Override
	public void run() {
		server = new MyServer("127.0.0.1", 5005);
		server.setNoDelay(true);

		Client client = new MyClient();
		client.connect(server, new DoWorkHandler<Void>() {
			@Override
			public void success(Void v) {
				login();
			}

			@Override
			public void failure(Throwable e) {
				e.printStackTrace();
				logger.warning(e.getMessage());
			}
		});
	}

	private void login() {
		System.out.println("login");
		while (true) {

		}
	}
}
package net.foreworld.speedt;

import java.util.logging.Logger;

import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class TestTask implements Runnable {

	private final Logger logger;
	private Server server;
	private Client client;

	public TestTask() {
		logger = Logger.getLogger(getClass().getName());
	}

	@Override
	public void run() {
		server = new Server(5005, "127.0.0.1");
		server.setNoDelay(true);
		// TODO
		client = new Client();
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
		client.request("login", "", new DoWorkHandler<Object>() {
			@Override
			public void success(Object o) {
				System.out.println(o);
			}

			@Override
			public void failure(Throwable e) {
				e.printStackTrace();
				logger.warning(e.getMessage());
			}
		});
	}
}
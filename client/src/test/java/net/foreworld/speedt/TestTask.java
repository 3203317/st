package net.foreworld.speedt;

import java.util.logging.Logger;

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
	private MyClient client;

	public TestTask() {
		logger = Logger.getLogger(getClass().getName());
	}

	@Override
	public void run() {
		server = new MyServer(5005, "127.0.0.1");
		server.setNoDelay(true);

		client = new MyClient();
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
		client.login("", "", new DoWorkHandler<Boolean>() {
			@Override
			public void success(Boolean v) {
				System.out.println(v);
			}

			@Override
			public void failure(Throwable e) {
				e.printStackTrace();
				logger.warning(e.getMessage());
			}
		});
	}
}
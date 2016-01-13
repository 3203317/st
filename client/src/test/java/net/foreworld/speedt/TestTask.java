package net.foreworld.speedt;

import java.util.logging.Logger;

import net.foreworld.speedt.client.Connector;
import net.foreworld.speedt.client.IPasswordNeed;
import net.foreworld.speedt.server.NwServer;
import net.foreworld.speedt.server.Server;
import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class TestTask implements Runnable {

	private final Logger logger;
	private Connector connector;
	private Server server;

	public TestTask() {
		logger = Logger.getLogger(getClass().getName());
	}

	@Override
	public void run() {
		server = new NwServer("127.0.0.1", 5005, "hx", "123222");
		server.setNoDelay(true);
		connector = new Connector(server);
		connector.connect(new DoWorkHandler<Void>() {
			@Override
			public void success(Void v) {
				connect();
			}

			@Override
			public void failure(Throwable e) {
				e.printStackTrace();
				logger.warning(e.getMessage());
			}
		});
	}

	private void connect() {
		while (true) {
			// TODO
		}
	}

	private class PasswordChooser implements IPasswordNeed {
		@Override
		public String getPassword() {
			return server.getPassword();
		}

		@Override
		public String getUsername() {
			return server.getUsername();
		}
	}
}
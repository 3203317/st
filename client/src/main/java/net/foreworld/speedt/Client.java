package net.foreworld.speedt;

import java.io.IOException;
import java.net.Socket;
import java.util.logging.Logger;

import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;
import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Client {
	private final Logger logger;
	private Server server;
	private Socket socket;
	private Reader reader;
	private Writer writer;

	public Client() {
		logger = Logger.getLogger(getClass().getName());
	}

	public void connect(Server server, DoWorkHandler<Void> handler) {
		logger.info("connect remote socket " + server.getPort() + ":"
				+ server.getPort());
		this.server = server;
		try {
			socket = new Socket(server.getHost(), server.getPort());
			socket.setTcpNoDelay(server.isNoDelay()); // disable Nagle algorithm
			reader = new Reader(socket.getInputStream());
			writer = new Writer(socket.getOutputStream());
		} catch (Exception e) {
			if (null != socket) {
				try {
					socket.close();
				} catch (IOException ioe) {
					ioe.printStackTrace();
				}
			}
			handler.failure(e);
			return;
		}
		handler.success(null);
	}

	public void request(String route, Object o, DoWorkHandler<Object> handler) {
		handler.success(null);
	}

	public void close(DoWorkHandler<Void> handler) {
		handler.success(null);
	}
}

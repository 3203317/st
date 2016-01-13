package net.foreworld.speedt.client;

import java.io.IOException;
import java.net.Socket;
import java.util.logging.Logger;

import net.foreworld.speedt.server.Server;
import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;
import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Connector {
	private final Logger logger;
	private Server server;
	private Socket socket;
	private Reader reader;
	private Writer writer;

	public Connector(Server server) {
		logger = Logger.getLogger(getClass().getName());
		this.server = server;
	}

	public void connect(DoWorkHandler<Void> handler) {
		logger.info("connect remote socket " + server.getIp() + ":"
				+ server.getPort());
		try {
			socket = new Socket(server.getIp(), server.getPort());
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
}
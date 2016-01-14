package net.foreworld.speedt;

import java.io.IOException;
import java.net.Socket;
import java.util.logging.Logger;

import net.foreworld.speedt.protocol.Protocol;
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
	private Socket socket;
	private Reader reader;
	private Writer writer;
	private Protocol protocol;

	public Client() {
		logger = Logger.getLogger(getClass().getName());
	}

	public void connect(Server server, DoWorkHandler<Void> handler) {
		logger.info("connect remote socket " + server.getHost() + ":"
				+ server.getPort());
		try {
			socket = new Socket(server.getHost(), server.getPort());
			socket.setTcpNoDelay(server.isNoDelay()); // disable Nagle algorithm
			socket.setKeepAlive(server.isKeepAlive());
			socket.setSoTimeout(server.getTimeout());
			reader = new Reader(socket.getInputStream());
			writer = new Writer(socket.getOutputStream());
			// TODO
			protocol = new Protocol(reader, writer);
			protocol.start();
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
		logger.info(route);
		handler.success(null);
	}

	public void close(DoWorkHandler<Void> handler) {
		if (null != protocol)
			protocol.cleanUpSession();
		if (null != socket) {
			try {
				socket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		handler.success(null);
	}
}
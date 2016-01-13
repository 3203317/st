package net.foreworld.speedt;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Server {
	private int port;
	private String host;
	private boolean noDelay;
	private boolean keepAlive;
	private int timeout;

	public boolean isNoDelay() {
		return noDelay;
	}

	public void setNoDelay(boolean noDelay) {
		this.noDelay = noDelay;
	}

	public boolean isKeepAlive() {
		return keepAlive;
	}

	public void setKeepAlive(boolean keepAlive) {
		this.keepAlive = keepAlive;
	}

	public int getTimeout() {
		return 1000 * timeout;
	}

	public void setTimeout(int timeout) {
		this.timeout = timeout;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public Server(int port, String host) {
		this.port = port;
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}
}

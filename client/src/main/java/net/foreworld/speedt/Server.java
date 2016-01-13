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

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public boolean isNoDelay() {
		return noDelay;
	}

	public void setNoDelay(boolean noDelay) {
		this.noDelay = noDelay;
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

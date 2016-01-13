package net.foreworld.speedt.server;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public abstract class Server {
	private String ip;
	private int port;
	private String username;
	private String password;
	private String name;
	private String version;

	private boolean noDelay;

	public boolean isNoDelay() {
		return noDelay;
	}

	public void setNoDelay(boolean noDelay) {
		this.noDelay = noDelay;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Server(String ip, int port) {
		this.ip = ip;
		this.port = port;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
}

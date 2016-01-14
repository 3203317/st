package net.foreworld.speedt.protocol;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class ClientToServerMessage {
	private String route;
	private String data;

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
}

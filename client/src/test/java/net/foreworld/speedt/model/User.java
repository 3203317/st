package net.foreworld.speedt.model;

import java.io.Serializable;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class User implements Serializable {
	private static final long serialVersionUID = 5453275759560456521L;

	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String toString() {
		return "username=" + username + "&password=" + password;
	}
}
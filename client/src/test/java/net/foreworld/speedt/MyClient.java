package net.foreworld.speedt;

import net.foreworld.speedt.client.Client;
import net.foreworld.speedt.utils.DoWorkHandler;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class MyClient extends Client {

	public void login(String userName, String userPass,
			DoWorkHandler<Boolean> handler) {
		handler.success(true);
	}
}

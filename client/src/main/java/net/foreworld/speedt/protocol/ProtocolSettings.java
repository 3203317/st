package net.foreworld.speedt.protocol;

import java.io.Serializable;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class ProtocolSettings implements Serializable {
	private static final long serialVersionUID = 4574746879675962793L;

	private static ProtocolSettings settings;

	public static ProtocolSettings getDefaultSettings() {
		if (null == settings)
			settings = new ProtocolSettings();
		return settings;
	}
}

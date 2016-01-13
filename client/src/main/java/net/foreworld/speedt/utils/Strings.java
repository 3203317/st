package net.foreworld.speedt.utils;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Strings {
	public static String toString(byte[] byteArray) {
		StringBuilder _sb = new StringBuilder("[");
		boolean _notFirst = false;
		for (byte b : byteArray) {
			if (_notFirst) {
				_sb.append(", ");
			} else {
				_notFirst = true;
			}
			_sb.append(b);
		}
		return _sb.append("]").toString();
	}

	public static boolean isTrimmedEmpty(String s) {
		return null == s || (0 == s.trim().length());
	}
}

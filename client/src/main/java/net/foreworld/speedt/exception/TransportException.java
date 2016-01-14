package net.foreworld.speedt.exception;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
@SuppressWarnings("serial")
public class TransportException extends Exception {

	public TransportException(String message, Throwable exception) {
		super(message, exception);
	}

	public TransportException(Throwable exception) {
		super(exception);
	}
}
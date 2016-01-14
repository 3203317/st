package net.foreworld.speedt.exception;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
@SuppressWarnings("serial")
public class ClosedConnectionException extends TransportException {

	public ClosedConnectionException(Throwable exception) {
		super(exception);
	}
}
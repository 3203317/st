package net.foreworld.speedt.protocol;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public interface ProtocolContext {
	void cleanUpSession();

	void putClientToServerMessage(ClientToServerMessage message);

	ClientToServerMessage getClientToServerMessage()
			throws InterruptedException;
}
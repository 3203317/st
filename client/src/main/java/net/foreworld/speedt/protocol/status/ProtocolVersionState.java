package net.foreworld.speedt.protocol.status;

import java.util.logging.Logger;

import net.foreworld.speedt.protocol.ProtocolContext;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class ProtocolVersionState extends ProtocolState {
	private final Logger logger;

	private static final int PROTOCOL_STRING_LENGTH = 14;

	public ProtocolVersionState(ProtocolContext ctx) {
		super(ctx);
		logger = Logger.getLogger(getClass().getName());
	}

	@Override
	public void execute() {
		String protocolString = reader.readString(PROTOCOL_STRING_LENGTH);
		System.out.println(protocolString);
	}
}

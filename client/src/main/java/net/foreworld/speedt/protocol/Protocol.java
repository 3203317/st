package net.foreworld.speedt.protocol;

import java.util.logging.Logger;

import net.foreworld.speedt.client.IPasswordNeed;
import net.foreworld.speedt.protocol.status.ProtocolState;
import net.foreworld.speedt.protocol.status.ProtocolVersionState;
import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author Administrator
 *
 */
public class Protocol implements ProtocolContext {
	private final Logger logger;
	private Reader reader;
	private Writer writer;
	private ProtocolState state;
	private final ProtocolSettings settings;
	private final IPasswordNeed passwordNeed;
	// Queue
	// Thread
	private Thread senderThread;
	private Thread receiverThread;
	// GET SET
	private String protocolVersion;

	public Protocol(Reader reader, Writer writer, IPasswordNeed passwordNeed,
			ProtocolSettings settings) {
		logger = Logger.getLogger(getClass().getName());
		this.reader = reader;
		this.writer = writer;
		this.settings = settings;
		this.passwordNeed = passwordNeed;
		state = new ProtocolVersionState(this);
	}

	public void handshake() {
		state.execute();
	}

	@Override
	public Writer getWriter() {
		return writer;
	}

	@Override
	public Reader getReader() {
		return reader;
	}

	@Override
	public IPasswordNeed getPasswordNeed() {
		return passwordNeed;
	}
}

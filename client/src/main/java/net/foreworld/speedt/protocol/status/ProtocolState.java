package net.foreworld.speedt.protocol.status;

import net.foreworld.speedt.protocol.ProtocolContext;
import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public abstract class ProtocolState {

	protected ProtocolContext ctx;
	protected Reader reader;
	protected Writer writer;

	public ProtocolState(ProtocolContext ctx) {
		this.ctx = ctx;
		reader = ctx.getReader();
		writer = ctx.getWriter();
	}

	protected void changeStateTo(ProtocolState state) {
		state.execute();
	}

	public abstract void execute();
}

package net.foreworld.speedt.protocol;

import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Protocol {
	private final Reader reader;
	private final Writer writer;

	public Protocol(Reader reader, Writer writer) {
		this.reader = reader;
		this.writer = writer;
	}
}

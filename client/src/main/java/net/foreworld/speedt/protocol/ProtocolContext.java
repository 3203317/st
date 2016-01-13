package net.foreworld.speedt.protocol;

import net.foreworld.speedt.transport.Reader;
import net.foreworld.speedt.transport.Writer;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public interface ProtocolContext {

	Writer getWriter();

	Reader getReader();
}
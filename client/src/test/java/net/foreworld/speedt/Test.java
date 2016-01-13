package net.foreworld.speedt;

/**
 *
 * @author huangxin (3203317@qq.com)
 *
 */
public class Test {

	public static void main(String[] args) {
		TestTask task = new TestTask();
		Thread thread = new Thread(task, "task");
		thread.start();
	}
}
package sentenceSeekersJavaCode;



import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import sun.net.httpserver.HttpServerImpl;
import sun.net.httpserver.HttpsServerImpl;

import java.io.IOException;
import java.io.OutputStream;
import java.util.concurrent.Executor;



public class HttpServerA {
	public static void main(String[] args) {
		try {
			HttpServer httpServer = HttpServerImpl.create(new InetSocketAddress(1337), 0);
			HttpContext hc = httpServer.createContext("/");
			hc.setHandler(new HttpHandler() {
				public void handle(HttpExchange httpExchange) throws IOException {
					String s = "<h1>Hello World.</h1>";
					httpExchange.sendResponseHeaders(200, s.length());
					OutputStream os = httpExchange.getResponseBody();
					os.write(s.getBytes());
					os.close();
				}
			});
			httpServer.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

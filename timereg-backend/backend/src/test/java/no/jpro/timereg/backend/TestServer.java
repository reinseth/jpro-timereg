package no.jpro.timereg.backend;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.webapp.WebAppContext;

public class TestServer {
    public static void main(String[] args) throws Exception {
        ResourceHandler staticHandler = new ResourceHandler();
        staticHandler.setResourceBase("../timereg-js/app");
        staticHandler.setDirectoriesListed(true);
        staticHandler.setWelcomeFiles(new String[]{"index.html"});

        WebAppContext webAppContext = new WebAppContext();
        webAppContext.setResourceBase("../../timereg-js/app");
        webAppContext.setDescriptor("src/main/webapp/WEB-INF/web.xml");
        webAppContext.setContextPath("/");

        HandlerList handlerList = new HandlerList();
        handlerList.addHandler(webAppContext);
//        handlerList.addHandler(staticHandler);

        Server server = new Server(8080);
        server.setHandler(webAppContext);

        server.start();
        server.join();
    }
}

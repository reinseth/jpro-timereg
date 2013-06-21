package no.jpro.timereg.backend.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.List;

@Path("timeregistreringer")
public class TimeregistreringerRestService {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Timeregistrering> alt() {
        return Arrays.asList(new Timeregistrering());
    }

    static class Timeregistrering {
        public String id = "13";
        public double timer = 7.5;
    }
}

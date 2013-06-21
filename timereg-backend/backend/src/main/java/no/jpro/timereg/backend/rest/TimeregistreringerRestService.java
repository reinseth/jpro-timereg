package no.jpro.timereg.backend.rest;

import org.joda.time.LocalDate;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Path("timeregistreringer")
public class TimeregistreringerRestService {


    private static AtomicLong idGenerator = new AtomicLong();
    private static List<Timeregistrering> registreringer = new ArrayList<Timeregistrering>();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Timeregistrering> getRegistreringer(@QueryParam("aar") int aar, @QueryParam("maaned") int maaned) {
        return registreringer;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registrer(Timeregistrering registrering) {
        registrering.id = idGenerator.incrementAndGet();
        registreringer.add(registrering);
        return Response.ok(registrering).build();
    }

    static class Timeregistrering {
        public Long id;
        public Double timer;
        public LocalDate dato;
        public String kommentar;
    }
}

package no.jpro.timereg.backend.rest;

import no.jpro.timereg.backend.domain.Timeregistrering;
import no.jpro.timereg.backend.service.TimeregistreringService;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("timeregistrering/{id}")
public class TimeregistreringRestService {

    private TimeregistreringService service = new TimeregistreringService();

    @GET
    public Timeregistrering get(@PathParam("id") final long id) {
        return service.get(id);
    }

    @POST
    public void post(Timeregistrering registrering) {
        service.oppdater(registrering);
    }
}

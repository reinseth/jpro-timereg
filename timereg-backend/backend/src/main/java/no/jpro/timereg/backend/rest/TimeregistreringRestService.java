package no.jpro.timereg.backend.rest;

import no.jpro.timereg.backend.domain.Timeregistrering;
import no.jpro.timereg.backend.service.TimeregistreringService;

import javax.ws.rs.*;

@Path("timeregistrering/{id}")
public class TimeregistreringRestService {

    private TimeregistreringService service = new TimeregistreringService();

    @GET
    public Timeregistrering get(@PathParam("id") long id) {
        return service.get(id);
    }

    @POST
    public void post(Timeregistrering endring) {
        service.oppdater(endring);
    }

    @DELETE
    public void delete(@PathParam("id") long id) {
        service.slett(id);
    }
}

package no.jpro.timereg.backend.rest;

import no.jpro.timereg.backend.domain.Timeregistrering;
import no.jpro.timereg.backend.service.TimeregistreringService;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.util.List;

@Path("timeregistreringer")
public class TimeregistreringerRestService {

    @Context
    private UriInfo uriInfo;
    private TimeregistreringService service = new TimeregistreringService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Timeregistrering> getRegistreringer(@QueryParam("aar") final int aar, @QueryParam("maaned") final int maaned) {
        return service.finn(aar, maaned);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registrer(Timeregistrering registrering) {
        return Response.created(uri(service.lagre(registrering))).build();
    }

    private URI uri(long id) {
        return uriInfo.getBaseUriBuilder().path(TimeregistreringRestService.class).build(id);
    }

}

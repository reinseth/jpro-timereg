
package no.jpro.timereg;

import com.sun.jndi.toolkit.url.Uri;
import no.jpro.timereg.dao.HashMapTimeregDAO;
import no.jpro.timereg.dao.TimeregDAO;
import no.jpro.timereg.dto.TimeregDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import java.net.URI;
import java.util.Collection;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

// The Java class will be hosted at the URI path "/myresource"
@Path("")
public class TimeregResource {
    private TimeregDAO timeregDAO = HashMapTimeregDAO.getInstance();


    @GET
    @Produces(APPLICATION_JSON)
    @Path("/timeregistreringer")
    public TimeregDTO[] findTimeregDTOer(@QueryParam("aar") int aar, @QueryParam("maaned") int maaned) {
        return timeregDAO.find(aar, maaned).toArray(new TimeregDTO[0]);
    }

    @POST
    @Consumes(APPLICATION_JSON)
    @Path("/timeregistreringer")
    public Response saveTimeregDTO(TimeregDTO dto) {
        Integer id = timeregDAO.save(dto);
        URI uri = UriBuilder.fromResource(this.getClass()).path(id.toString()).build();
        return Response.created(uri).build();
    }

    @GET
    @Produces(APPLICATION_JSON)
    @Path("/timeregistrering/{id}")
    public TimeregDTO getTimeregDTO(@PathParam("id") int id) {
        return timeregDAO.getById(id);
    }
}

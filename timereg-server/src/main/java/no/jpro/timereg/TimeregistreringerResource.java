
package no.jpro.timereg;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.net.URI;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import no.jpro.timereg.dao.HashMapTimeregDAO;
import no.jpro.timereg.dao.TimeregDAO;
import no.jpro.timereg.dto.TimeregDTO;

@Path("timeregistreringer")
public class TimeregistreringerResource {
    private TimeregDAO timeregDAO = HashMapTimeregDAO.getInstance();
    
    @Context
    private UriInfo uriInfo;


    @GET
    @Produces(APPLICATION_JSON)
    public TimeregDTO[] findTimeregDTOer(@QueryParam("aar") Integer aar, @QueryParam("maaned") Integer maaned) {
        return timeregDAO.find(aar, maaned).toArray(new TimeregDTO[0]);
    }

    @POST
    @Consumes(APPLICATION_JSON)
    public Response saveTimeregDTO(TimeregDTO dto) {
        Integer id = timeregDAO.save(dto);
        URI uri = uriInfo.getBaseUriBuilder().path(TimeregisteringResource.class).build(id);
        return Response.created(uri).build();
    }
}


package no.jpro.timereg;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.net.URI;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import no.jpro.timereg.dao.HashMapTimeregDAO;
import no.jpro.timereg.dao.TimeregDAO;
import no.jpro.timereg.dto.TimeregDTO;

@Path("timeregistrering/{id}")
public class TimeregisteringResource {
    private TimeregDAO dao = HashMapTimeregDAO.getInstance();

    @Context
    private UriInfo uriInfo;
    
    @GET
    @Produces(APPLICATION_JSON)
    public TimeregDTO getTimeregDTO(@PathParam("id") int id) {
        return dao.getById(id);
    }
    
    @POST
    @Consumes(APPLICATION_JSON)
    public Response update(@PathParam("id") int id, TimeregDTO dto ) {
    	TimeregDTO saved = dao.getById(id);
    	saved.setDato(dto.getDato());
    	saved.setKommentar(dto.getKommentar());
    	saved.setTimer(dto.getTimer());
    	dao.save(saved);
        URI uri = uriInfo.getBaseUriBuilder().path(TimeregisteringResource.class).build(id);
        return Response.created(uri).build();
    }
    
    @DELETE
    public void delete(@PathParam("id") int id) {
    	TimeregDTO dto = dao.getById(id);
        dao.delete(dto);
    }
}

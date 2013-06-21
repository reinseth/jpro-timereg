package no.jpro.timereg.dao;


import no.jpro.timereg.dto.TimeregDTO;

import java.util.Collection;

public interface TimeregDAO {

    Integer save(TimeregDTO dto);

    TimeregDTO getById(Integer id);

	Collection<TimeregDTO> find(Integer aar, Integer mnd);
}

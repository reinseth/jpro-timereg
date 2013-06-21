package no.jpro.timereg.dao;


import no.jpro.timereg.dto.TimeregDTO;

import java.util.Collection;

public interface TimeregDAO {
    Collection<TimeregDTO> find(int aar, int mnd);

    int save(TimeregDTO dto);

    TimeregDTO getById(Integer id);
}

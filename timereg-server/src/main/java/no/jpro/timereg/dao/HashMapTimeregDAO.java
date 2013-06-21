package no.jpro.timereg.dao;


import com.google.common.collect.ImmutableMap;
import no.jpro.timereg.dto.TimeregDTO;
import org.joda.time.DateTime;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class HashMapTimeregDAO implements TimeregDAO {

    private Map<Integer, TimeregDTO> map = new HashMap<Integer, TimeregDTO>();
    private int counter = 0;
    private static HashMapTimeregDAO instance;

    private HashMapTimeregDAO() {
    }

    public static HashMapTimeregDAO getInstance() {
        if (instance == null) {
            instance = new HashMapTimeregDAO();
        }
        return instance;
    }

    @Override
    public Collection<TimeregDTO> find(int aar, int mnd) {
        return map.values();
    }

    private Map<Integer, TimeregDTO> testMap() {
        TimeregDTO dto = new TimeregDTO(DateTime.now(), 8,"første ");
        dto.id = 1;
        return ImmutableMap.of(dto.id, dto);
    }

    @Override
    public int save(TimeregDTO timereg) {
        if (timereg.id == null) {
            timereg.id = findId();
        }
        map.put(timereg.id, timereg);
        return timereg.id;
    }

    public TimeregDTO getById(Integer id) {
        return map.get(id);
    }

    private Integer findId() {
        return counter++;
    }
}

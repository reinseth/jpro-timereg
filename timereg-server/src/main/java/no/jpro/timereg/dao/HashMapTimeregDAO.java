package no.jpro.timereg.dao;


import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import no.jpro.timereg.dto.TimeregDTO;

import org.joda.time.DateTime;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

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
    public Collection<TimeregDTO> find(final Integer aar, final Integer mnd) {
    	return Collections2.filter(map.values(), new Predicate<TimeregDTO>() {

			@Override
			public boolean apply(TimeregDTO dto) {
				DateTime dato = dto.getDato();
				boolean matchesAar = aar== null || dato.year().get()== aar;
				boolean matchesMnd = mnd== null || dato.monthOfYear().get()==mnd;
				return matchesAar && matchesMnd;
			}
		});
    	
    }

    @Override
    public Integer save(TimeregDTO timereg) {
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

	@Override
	public void delete(TimeregDTO dto) {
		map.remove(dto.id);
	}
}

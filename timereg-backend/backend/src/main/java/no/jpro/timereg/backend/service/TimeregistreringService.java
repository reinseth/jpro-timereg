package no.jpro.timereg.backend.service;

import com.google.common.base.Predicate;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import no.jpro.timereg.backend.domain.Timeregistrering;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

public class TimeregistreringService {

    private static final AtomicLong idGenerator = new AtomicLong();
    private static final List<Timeregistrering> registreringer = new ArrayList<Timeregistrering>();

    public List<Timeregistrering> finn(final int aar, final int maaned) {
        return ImmutableList.copyOf(Iterables.filter(registreringer, new Predicate<Timeregistrering>() {
            @Override
            public boolean apply(Timeregistrering timeregistrering) {
                return timeregistrering.dato.getYear() == aar && timeregistrering.dato.getMonthOfYear() == maaned;
            }
        }));
    }

    public Timeregistrering get(final long id) {
        return Iterables.find(registreringer, new Predicate<Timeregistrering>() {
            @Override
            public boolean apply(Timeregistrering timeregistrering) {
                return timeregistrering.id == id;
            }
        });
    }

    public long lagre(Timeregistrering registrering) {
        registrering.id = idGenerator.incrementAndGet();
        registreringer.add(registrering);
        return registrering.id;
    }

    public void oppdater(Timeregistrering registrering) {
        Timeregistrering eksisterende = get(registrering.id);
        int index = registreringer.indexOf(eksisterende);
        registreringer.set(index, registrering);
    }
}

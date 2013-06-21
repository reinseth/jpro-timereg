package no.jpro.timereg.dto;


import org.joda.time.DateTime;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class TimeregDTO {
    public Integer id;
    @XmlJavaTypeAdapter(DateAdapter.class)
    private DateTime dato;
    private BigDecimal timer;
    private String kommentar;

    private TimeregDTO() {
    }

    public TimeregDTO(String dato, BigDecimal timer, String kommentar) {
        this.dato = DateTime.parse(dato);
        this.timer = timer;
        this.kommentar = kommentar;
    }

    public TimeregDTO(DateTime dato, double timer, String kommentar) {
        this.dato = dato;
        this.timer = BigDecimal.valueOf(timer);
        this.kommentar = kommentar;
    }

    public String getTimestampAsString() {
        return (dato != null) ? new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(dato) : null;
    }
}

package no.jpro.timereg.dto;

import javax.xml.bind.annotation.adapters.XmlAdapter;

import org.joda.time.DateTime;


public class DateAdapter extends XmlAdapter<String, DateTime> {

    @Override
    public DateTime unmarshal(String v) throws Exception {
        return DateTime.parse(v);
    }

    @Override
    public String marshal(DateTime v) throws Exception {
        return v.toString();
    }
}

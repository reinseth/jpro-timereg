package no.jpro.timereg.dto;

import junit.framework.TestCase;
import org.joda.time.DateTime;


public class DateAdapterTest extends TestCase {
    public void testMarshal() throws Exception {
        DateAdapter test = new DateAdapter();
        DateTime syttendeMai = new DateTime(2013,5,17,0,0);
        assertEquals("2013-05-17T00:00:00.000+02:00", test.marshal(syttendeMai));
    }

    public void testUnmarshal() throws Exception {
        DateAdapter test = new DateAdapter();
        DateTime syttendeMai = new DateTime(2013,5,17,0,0);
        assertTrue(syttendeMai.isEqual(test.unmarshal("2013-05-17T00:00:00.000+02:00")));
    }
}

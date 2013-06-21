Timereg
=======

For å kjøre opp en server og teste front-end:
- Installer Node fra http://nodejs.org/
- Installer Grunt fra en kommandolinje: npm install -g grunt-cli
- cd timereg/timereg-js
- npm install
- grunt connect:dist
- åpne http://localhost:8000/index-mocked.html

Spesifikasjon av REST API
-------------------------

### GET /api/timeregistreringer/
Returnerer samtlige timeregistreringer i følgende JSON-format:

```json
[
  {"id": 123, "dato": "2013-06-01T00:00:00Z", "timer": 8, "kommentar": ""},
  {"id": 124, "dato": "2013-06-02T00:00:00Z", "timer": 7.5, "kommentar": ""}
]
```

### GET /api/timeregistreringer/?aar=2013&maaned=6
Returnerer et filtrert uttrekk av timeregistreringer for én enkelt måned (i samme format som over).

### POST /api/timeregistreringer/
Lagrer gitt timeregistrering og returnerer JSON-representasjonen til denne i tillegg til en See-Other header.

Input:
```json
{"dato": "2013-06-03T00:00:00Z", "timer": 7.5, "kommentar": "En eller annen kommentar"}
```

Response:
See-Other: /api/timeregistrering/145
```json
{"id": 145, "dato": "2013-06-03T00:00:00Z", "timer": 7.5, "kommentar": "En eller annen kommentar"}
```

### GET /api/timeregistrering/145
Returnerer timeregistreringen for gitt id (eller 404 hvis den ikke eksisterer) i JSON:
```json
{"id": 145, "dato": "2013-06-03T00:00:00Z", "timer": 7.5, "kommentar": "En eller annen kommentar"}
```

### POST /api/timeregistrering/145
Oppdaterer timeregistreringen for gitt id og returnerer den oppdaterte registreringen i JSON (eller 404 hvis registreringen ikke eksisterer).

Input:
```json
{"id": 145, "dato": "2013-06-05T00:00:00Z", "timer": 6, "kommentar": "Endret dato og timer"}
```

Response:
```json
{"id": 145, "dato": "2013-06-05T00:00:00Z", "timer": 6, "kommentar": "Endret dato og timer"}
```

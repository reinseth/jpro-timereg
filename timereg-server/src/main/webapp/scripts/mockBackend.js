angular.module("timeregMock", ["timereg", "ngMockE2E"])
    .run(function ($httpBackend) {

        function generateId() {
            if (!generateId.nextId) {
                generateId.nextId = hentRegistreringer().reduce(function (max, r) {
                    return r.id > max ? r.id : max;
                }, 0);
            }
            return ++generateId.nextId;
        }

        function hentRegistreringer() {
            return angular.fromJson(localStorage.getItem("registreringer")) || [];
        }

        function lagreRegistreringer(registreringer) {
            localStorage.setItem("registreringer", angular.toJson(registreringer));
        }

        function finnRegistrering(registreringer, id) {
            return registreringer.filter(function (r) {
                return String(r.id) === String(id);
            })[0];
        }

        $httpBackend.whenGET(/^\/api\/timeregistreringer\/?\?(.*)/).respond(function (method, url) {
            var maaned = /maaned=(.+?)(&|$)/.exec(url)[1];
            var aar = /aar=(.+?)(&|$)/.exec(url)[1];
            var resultat = hentRegistreringer().filter(function (r) {
                var dato = new Date(r.dato);
                if (maaned && aar) {
                    return (dato.getMonth() + 1) === parseInt(maaned) && (dato.getFullYear() === parseInt(aar));
                }
                return true;
            });
            return [200, angular.toJson(resultat), {"Content-Type": "application/json"}];
        });

        $httpBackend.whenPOST(/^\/api\/timeregistreringer\/?$/).respond(function(method, url, data) {
            var registreringer = hentRegistreringer();
            var registrering = angular.fromJson(data);
            registrering.id = generateId();
            registreringer.push(registrering);
            lagreRegistreringer(registreringer);
            return [200, angular.toJson(registrering), {"Content-Type": "application/json"}];
        });

        $httpBackend.whenGET(/^\/api\/timeregistrering\/(\d+)\/?$/).respond(function (method, url) {
            var id = /\/api\/timeregistrering\/(\d+)/.exec(url)[1];
            var registrering = finnRegistrering(hentRegistreringer(), id);

            if (registrering) {
                return [200, angular.toJson(registrering), {"Content-Type": "application/json"}];
            } else {
                return [404, "Ingen registrering med id " + id];
            }
        });

        $httpBackend.whenPOST(/^\/api\/timeregistrering\/(\d+)\/?$/).respond(function(method, url, data) {
            var id = /\/api\/timeregistrering\/(\d+)/.exec(url)[1];
            var registreringer = hentRegistreringer();
            var registrering = finnRegistrering(registreringer, id);

            if (!registrering) {
                return [404, "Ingen registrering med id " + id];
            }

            var endringer = angular.toJson(data);
            Object.keys(endringer).forEach(function (key) {
                registrering[key] = endringer[key];
            });

            lagreRegistreringer(registreringer);
            return [200, angular.toJson(registrering), {"Content-Type": "application/json"}];
        });

        $httpBackend.whenDELETE(/^\/api\/timeregistrering\/(\d+)\/?$/).respond(function (method, url, data) {
            console.log("REST-API: DELETE " + url);
            var id = /\/api\/timeregistrering\/(\d+)/.exec(url)[1];
            var registreringer = hentRegistreringer();
            var registrering = finnRegistrering(registreringer, id);

            if (!registrering) {
                console.log("REST-API: Ingen registrering med id " + id);
                return [404, "Ingen registrering med id " + id];
            }

            registreringer.splice(registreringer.indexOf(registrering), 1);
            lagreRegistreringer(registreringer);
            console.log("REST-API: Registrering med id " + id + " ble slettet.");
            return [200, "OK"];
        });

        $httpBackend.whenGET(/^partials.*/).passThrough();
    });
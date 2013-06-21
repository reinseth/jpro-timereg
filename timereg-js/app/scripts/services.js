angular.module("timeregServices", [/*"ngResource"*/])
    .factory("Timeregistreringer", function (/*$resource*/$http) {

        function parseDate(date) {
            if (angular.isDate(date)) {
                return date;
            }
            if (angular.isString(date)) {
                return new Date(date);
            }
            if (angular.isArray(date)) {
                return new Date(date[0], date[1] - 1, date[2]);
            }
            return null;
        }

        function applyCallback(callback) {
            if (angular.isFunction(callback)) {
                var args = Array.prototype.slice.call(arguments, 1);
                callback.apply(null, args);
            }

        }

        function Timeregistrering(data) {
            this.init(data);
        }

        Timeregistrering.prototype = {
            init: function (data) {
                this.id = data.id || "";
                this.dato = parseDate(data.dato) || new Date();
                this.timer = data.timer || 0;
                this.kommentar = data.kommentar || "";
                return this;
            },

            erNy: function () {
                return !this.id;
            }
        };

        function toJson(registrering) {
            return {
                id: registrering.id,
                dato: [registrering.dato.getFullYear(), registrering.dato.getMonth() + 1, registrering.dato.getDate()],
                kommentar: registrering.kommentar,
                timer: registrering.timer
            }
        }

        return {
            lag: function (data) {
                return new Timeregistrering(data || {});
            },

            finnForMaaned: function (aar, maaned, callback) {
                var resultat = [];
                $http.get("/api/timeregistreringer/?aar=" + aar + "&maaned=" + maaned)
                    .success(function(registreringer) {
                        registreringer.forEach(function (r) {
                            resultat.push(new Timeregistrering(r));
                        });
                        applyCallback(callback, registreringer);
                    });
                return resultat;
            },

            lagre: function (registrering, callback) {
                if (registrering.erNy()) {
                    $http.post("/api/timeregistreringer/", toJson(registrering))
                        .success(function (resultat, status, headers) {
                            $http.get(headers("Location")).success(function (oppdatertRegistrering) {
                                registrering.id = oppdatertRegistrering.id;
                                applyCallback(callback, registrering);
                            });
                        });
                } else {
                    $http.post("/api/timeregistrering/" + registrering.id, toJson(registrering))
                        .success(function () {
                            applyCallback(callback, registrering);
                        });
                }
            },

            slett: function (registrering, callback) {
                $http.delete("/api/timeregistrering/" + registrering.id)
                    .success(function () {
                        applyCallback(callback, registrering);
                    });
            }
        }
    });
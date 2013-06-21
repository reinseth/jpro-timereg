angular.module("timeregServices", [/*"ngResource"*/])
    .factory("Timeregistreringer", function (/*$resource*/$http) {

//        function mapRad(rad) {
//            rad.dato = new Date(rad.dato);
//            return rad;
//        }
//
//        function mapRader(rader) {
//            return rader.map(mapRad);
//        }
//
//        return $resource("/api/timeregistrering/{id}", {id: '@id'}, {
//            "query": {
//                method: "GET",
//                transformResponse: function (data) {
//                    return mapRader(angular.fromJson(data));
//                },
//                isArray: true
//            }
//        });

        function parseDate(date) {
            if (angular.isDate(date)) {
                return date;
            }
            if (angular.isString(date)) {
                return new Date(date);
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
                    $http.post("/api/timeregistreringer/", registrering)
                        .success(function (resultat, status, headers) {
                            $http.get(headers('Location')).success(function(oppdatertRegistrering) {
                            	registrering.id = oppdatertRegistrering.id;
                            	applyCallback(callback, registrering);
                            });
                            
                        });
                } else {
                    $http.post("/api/timeregistrering/" + registrering.id, registrering)
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
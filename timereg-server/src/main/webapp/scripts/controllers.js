angular.module("timeregControllers", ["timeregServices"])
    .controller("MånedCtrl", function ($scope, $routeParams, $location, Timeregistreringer) {

        var månednavn = [
            'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
        ];

        function maaned() {
            return parseInt($routeParams.maaned, 10);
        }

        function aar() {
            return parseInt($routeParams.aar, 10);
        }

        function nesteDato() {
            var nesteDag = $scope.registreringer.reduce(function (max, r) {
                return r.dato.getDate() > max ? r.dato.getDate() : max;
            }, 0) + 1;
            return Math.min(nesteDag, $scope.antallDagerIMaaneden());
        }

        function finnRegistrering(id) {
            return _.find($scope.registreringer, function (r) {
                return r.id === id;
            });
        }

        $scope.tittel = månednavn[maaned() - 1] + " " + aar();

        $scope.registreringer = Timeregistreringer.finnForMaaned(aar(), maaned(), function () {
            $scope.skjemaData.reset();
        });

        $scope.skjemaData = {
            id: '',
            dato: '',
            timer: 8,
            kommentar: '',

            reset: function () {
                this.id = '';
                this.dato = nesteDato();
                this.timer = 8;
                this.kommentar = '';
            },

            initFra: function(registrering) {
                this.id = registrering.id;
                this.dato = registrering.dato.getDate();
                this.timer = registrering.timer;
                this.kommentar = registrering.kommentar;
            }
        };

        $scope.antallDagerIMaaneden = function () {
            var dato = new Date(aar(), maaned(), 1);
            dato.setDate(dato.getDate() - 1);
            return dato.getDate();
        };

        $scope.sum = function () {
            return $scope.registreringer.reduce(function (accu, r) {
                return accu + r.timer;
            }, 0);
        };

        $scope.submit = function () {
            if ($scope.form.$valid) {
                var erNy = !$scope.skjemaData.id;
                var registrering;
                if (erNy) {
                    registrering = Timeregistreringer.lag();
                } else {
                    registrering = finnRegistrering($scope.skjemaData.id);
                }

                registrering.dato = new Date(aar(), maaned() - 1, $scope.skjemaData.dato);
                registrering.timer = $scope.skjemaData.timer;
                registrering.kommentar = $scope.skjemaData.kommentar;

                Timeregistreringer.lagre(registrering, function() {
                    if (erNy) {
                        $scope.registreringer.push(registrering);
                    }
                    $scope.skjemaData.dato = nesteDato();
                    $scope.flash = "";
                });
            } else {
                var melding;
                if ($scope.form.dato.$invalid) {
                    melding = "Skriv inn en gyldig dato (1-" + $scope.antallDagerIMaaneden() + ")";
                } else if ($scope.form.timer.$invalid) {
                    melding = "Skriv inn antall timer";
                }
                $scope.flash = melding;
            }
        };

        $scope.slett = function () {
            var registerering = finnRegistrering($scope.skjemaData.id);
            Timeregistreringer.slett(registerering, function () {
                $scope.registreringer.splice($scope.registreringer.indexOf(registerering), 1);
                $scope.flash = "";
                $scope.skjemaData.reset();
            });
        };

        $scope.nesteMaaned = function () {
            // TODO create service for redirecting
            var dato = new Date(aar(), maaned(), 1);
            $location.path("/timer/" + dato.getFullYear() + "/" + (dato.getMonth() + 1));
        };

        $scope.forrigeMaaned = function () {
            var dato = new Date(aar(), maaned() - 2, 1);
            $location.path("/timer/" + dato.getFullYear() + "/" + (dato.getMonth() + 1));
        };

        $scope.velgRegistrering = function (registrering, event) {
            event.preventDefault();
            event.stopPropagation();
            if ($scope.skjemaData.id === registrering.id) {
                $scope.skjemaData.reset();
            } else {
                $scope.skjemaData.initFra(registrering);
            }
        };

        if (isNaN(maaned()) || maaned() < 1 || maaned() > 12) {
            // TODO exception handler
            throw "Ugyldig måned";
        }

        if (isNaN(aar())) {
            // TODO exception handler
            throw "Ugyldig år";
        }

        // TODO Lagrings-service som bruker LocalStorage
        // TODO radene kan velges med checkboxer
        // TODO valgte rader kan endres i samme skjema som "registrering"
        // TODO valgte rader kan slettes
    });
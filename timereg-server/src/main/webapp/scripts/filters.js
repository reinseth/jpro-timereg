angular.module("timeregFilters", [])
    .filter("dag", function () {
        var dager = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
        return function(dato) {
            return dager[dato.getDay()];
        };
    });
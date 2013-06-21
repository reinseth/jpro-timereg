angular.module("timereg", ["timeregControllers", "timeregFilters"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/timer/:aar/:maaned", {templateUrl: "partials/maaned.html", controller: 'MånedCtrl'})
            .otherwise({
                redirectTo: function() {
                    var nå = new Date();
                    var år = nå.getFullYear();
                    var måned = nå.getMonth() + 1;
                    if (måned < 10) {
                        måned = "0" + måned;
                    }
                    return "/timer/" + år + "/" + måned;
                }
            });
    });

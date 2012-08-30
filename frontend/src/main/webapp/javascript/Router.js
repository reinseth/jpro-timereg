define(function(require) {
    var Backbone = require('Backbone'),
        Calendar = require('views/calendar/Calendar');

    var Router = Backbone.Router.extend({
        routes: {
            'calendar/:year/:month/:date': 'calendar',
            '*default': 'defaultRoute'
        },

        calendar: function(year, month, date) {
            var date = new Date(year, month + 1, date);
            new Calendar({date: date}).open();
        },

        defaultRoute: function() {
            var date = new Date();
            this.navigate('calendar/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(), true);
        }
    });

    return {
        init: function() {
            new Router();
            Backbone.history.start();
        }
    }
});
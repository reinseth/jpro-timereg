define(function(require) {
    var Backbone = require('Backbone'),
        MainView = require('views/MainView');

    return Backbone.View.extend({
        open: function() {
            MainView.getDefault().open(this);
        }
    });
});
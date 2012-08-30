define(function(require) {
    var $ = require('$'),
        Backbone = require('Backbone');

    var MainView = Backbone.View.extend({
        className: 'main',

        init: function() {
            if (!this.initialized) {
                $('body').html(this.$el);
                this.initialized = true;
            }
        },

        open: function(topView) {
            this.init();
            topView.render();
            this.$el.html(topView.el);
        }
    });

    var instance;
    MainView.getDefault = function() {
        if (!instance) {
            instance = new MainView();
        }
        return instance;
    };

    return MainView;
});
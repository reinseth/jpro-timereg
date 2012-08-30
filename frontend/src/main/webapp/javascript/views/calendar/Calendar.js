define(function(require) {
    var $ = require('$'),
        TopView = require('views/TopView');

    return TopView.extend({
        className: 'calendar',

        render: function() {
            var date = this.options.date;

            var firstOfMonth = new Date(date.getYear(), date.getMonth(), 1);
            var lastOfMonth = new Date(date.getYear(), date.getMonth() + 1, 0);
            var start = new Date(date.getYear(), date.getMonth(), 1 - firstOfMonth.getDay());
            var end = new Date(date.getYear(), date.getMonth(), lastOfMonth.getDate() + (6 - lastOfMonth.getDay()));

            var $table = $('<table class="calendar-month"/>');
            var $tbody = $('<tbody/>');
            var $tr, $td;

            for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
                if (d.getDay() === 0) {
                    $tr = $('<tr/>');
                    $tbody.append($tr);
                }
                $td = $('<td/>')
                    .data('day', d.getDay())
                    .html(d.getDate());
                if (d.getMonth() !== date.getMonth()) {
                    $td.addClass('other-month');
                }
                $tr.append($td);
            }

            $table.append($tbody);
            this.$el.html($table);

            return this;
        }
    });
});
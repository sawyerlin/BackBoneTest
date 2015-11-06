define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        loglevel = require('loglevel');

    return Backbone.View.extend({
        el: 'body',
        render: function(action) {
            if (!_.isNull(action)) {
                require(['views/' + action], function(CurrentView) {
                    var view = new CurrentView();
                    view.render();
                });
            }
        }
    });
});

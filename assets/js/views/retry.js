define(function(require) {
    'use strict';
    var $ = require('jquery'),
        Backbone = require('backbone'),
        RetryModel = require('models/retryModel'),
        template = require('text!templates/retry.html');

    return Backbone.View.extend({
        el: '#main',
        events: {
            'click .test': 'test'
        },
        test: function() {
            var retryModel = new RetryModel();
            retryModel.fetch({
                /*exhaust: function(jqXHR, textStatus, errorThrown) {*/
                    //console.log('>>> my test');
                /*},*/
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('>>> my test 0');
                },
            });
        },
        render: function() {
            this.$el.html(template);
        }
    });
});

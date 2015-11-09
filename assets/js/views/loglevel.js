define(function(require) {
    'use strict';
    var $ = require('jquery'),
        Backbone = require('backbone'),
        loglevel = require('loglevel'),
        template = require('text!templates/loglevel.html'),
        level = 'warn',
        logServer = 'http://canalplay-orange.hubee.tv/log/generic/';

    var originalFactory = loglevel.methodFactory;
    loglevel.methodFactory = function(methodName, logLevel, loggerName) {
        var rawMethod = originalFactory(methodName, logLevel, loggerName);
        return function(message) {
            rawMethod('Newsflash: ' + message);
        };
    };

    var localLog = loglevel.getLogger('local'),
        htmlLog = loglevel.getLogger('html'),
        serverLog = loglevel.getLogger('server');
    localLog.setLevel(level);
    htmlLog.setLevel(level);
    serverLog.setLevel(level);
    return Backbone.View.extend({
        el: '#main',
        events: {
            'click .testlocal .start': 'startlocal',
            'click .testhtml .htmlplugin': 'addhtmlplugin',
            'click .testhtml .start': 'starthtml',
            'click .testserver .serverplugin': 'addserverplugin',
            'click .testserver .start': 'startserver',
            'change .loglevel': 'changeLevel'
        },
        changeLevel: function(value) {
            level = value.target.value;
            localLog.setLevel(level);
            htmlLog.setLevel(level);
            serverLog.setLevel(level);
        },
        startlocal: function() {
            localLog.trace('trace log');
            localLog.debug('debug log');
            localLog.info('info log');
            localLog.warn('warn log');
            localLog.error('error log');
        },
        addhtmlplugin: function(value) {
            $(value.target).remove();
            var self = this,
                originalFactory = htmlLog.methodFactory;
            htmlLog.methodFactory = function(methodName, logLevel, loggerName) {
                var rawMethod = originalFactory(methodName, logLevel, loggerName);
                return function (message) {
                    self.$('.logs').append(message);
                    rawMethod(message);
                };
            };
            htmlLog.setLevel(level);
        },
        starthtml: function() {
            htmlLog.trace('trace log');
            htmlLog.debug('debug log');
            htmlLog.info('info log');
            htmlLog.warn('warn log');
            htmlLog.error('error log');
        },
        addserverplugin: function(value) {
            $(value.target).remove();
            var self = this,
            originalFactory = serverLog.methodFactory;
            serverLog.methodFactory = function(methodName, logLevel, loggerName) {
                var rawMethod = originalFactory(methodName, logLevel, loggerName);
                return function (service, message) {
                    if (methodName === 'info' || methodName === 'error') {
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: logServer + methodName,
                            data: {'service': service, 'msg': message}
                        })
                        .done(function(data) {
                            console.log(data);
                        })
                        .fail(function(xhr) {
                            console.log(xhr.responseText);
                        });
                    }
                    rawMethod(message);
                };
            };
            serverLog.setLevel(level);
        },
        startserver: function() {
            serverLog.trace('TestService', 'trace log');
            serverLog.debug('TestService', 'debug log');
            serverLog.info('TestService', 'info log');
            serverLog.warn('TestService', 'warn log');
            serverLog.error('TestService', 'error log');
        },
        render: function() {
            this.$el.html(template);
        }
    });
});

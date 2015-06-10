/**
 * postal.observe - A postal.js plugin that provides a way to get a subscription as Rx.Observable
 * Author: Tim Ermilov <yamalight@gmail.com> (http://codezen.net)
 * Version: v0.1.0
 * Url: https://github.com/yamalight/postal.observe
 * License(s): MIT
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        // Node, or CommonJS-Like environments
        module.exports = function (postal) {
            return factory(require('rx'), postal, this);
        };
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['rx', 'postal'], function (Rx, postal) {
            return factory(Rx, postal, root);
        });
    } else {
        // Browser globals
        root.postal = factory(root.Rx, root.postal, root);
    }
}(this, function (Rx, postal, global) {
    postal.observe = function (options) {
        var self = this;
        var channel = options.channel;
        var topic = options.topic;
        return Rx.Observable.fromEventPattern(

        function addHandler(h) {
            return self.subscribe({
                channel: channel,
                topic: topic,
                callback: h,
            });
        }, function delHandler(_, sub) {
            sub.unsubscribe();
        });
    };
    // add observe to ChannelDefinition
    postal.ChannelDefinition.prototype.observe = function (options) {
        var self = this;
        var topic = options.topic ? options.topic : options;
        return Rx.Observable.fromEventPattern(

        function addHandler(h) {
            return self.bus.subscribe({
                channel: self.channel,
                topic: topic,
                callback: h,
            });
        }, function delHandler(_, sub) {
            sub.unsubscribe();
        });
    };
    return postal;
}));
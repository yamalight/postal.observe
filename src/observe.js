/* global postal */
/* global Rx */
postal.observe = function(options) {
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
        },
        function delHandler(_, sub) {
            sub.unsubscribe();
        }
    );
};

// add observe to ChannelDefinition
postal.ChannelDefinition.prototype.observe = function(options) {
    var self = this;
    var topic = options.topic ? options.topic : options;

    return Rx.Observable.fromEventPattern(
        function addHandler(h) {
            return self.bus.subscribe({
                channel: self.channel,
                topic: topic,
                callback: h,
            });
        },
        function delHandler(_, sub) {
            sub.unsubscribe();
        }
    );
};

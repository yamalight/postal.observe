/* global describe, postal, it, after, before, expect */
(function() {
    var postal = typeof window === 'undefined' ? require('../bower/postal.js/lib/postal.js') : window.postal;
    var expect = typeof window === 'undefined' ? require('expect.js') : window.expect;
    var _ = typeof window === 'undefined' ? require('lodash') : window._;
    var Rx = typeof window === 'undefined' ? require('rx') : window.Rx;
    var postalObserve = typeof window === 'undefined' ? require('../lib/postal.observe.js')(postal) : window.postal;
    var subscription;
    var sub;
    var channel;
    var caughtSubscribeEvent = false;
    var caughtUnsubscribeEvent = false;

    describe('postal.observe', function() {
        describe('when calling using postal object', function() {
            it('should get the expected message', function(done) {
                postal.observe({
                    channel: 'ChannelA',
                    topic: 'topic.on.channel.a'
                })
                .skip(3).take(1)
                .subscribe(function(data) {
                    expect(data).to.be('Via message bus!');
                    done();
                });
                postal.publish({
                    channel: 'ChannelA',
                    topic: 'topic.on.channel.a',
                    data: 'And it is testable!'
                });
                postal.publish({
                    channel: 'ChannelA',
                    topic: 'topic.on.channel.a',
                    data: 'Deferred behavior!'
                });
                postal.publish({
                    channel: 'ChannelA',
                    topic: 'topic.on.channel.a',
                    data: 'Hey look!'
                });
                postal.publish({
                    channel: 'ChannelA',
                    topic: 'topic.on.channel.a',
                    data: 'Via message bus!'
                });
            });
        });
        describe('when calling using channel object', function() {
            it('should get the expected message', function(done) {
                var testChannel = postal.channel('test');
                testChannel.observe('topic.on.channel.a').skip(3).take(1)
                .subscribe(function(data) {
                    expect(data).to.be('Via message bus!');
                    done();
                });
                testChannel.publish({
                    topic: 'topic.on.channel.a',
                    data: 'And it is testable!'
                });
                testChannel.publish({
                    topic: 'topic.on.channel.a',
                    data: 'Deferred behavior!'
                });
                testChannel.publish({
                    topic: 'topic.on.channel.a',
                    data: 'Hey look!'
                });
                testChannel.publish({
                    topic: 'topic.on.channel.a',
                    data: 'Via message bus!'
                });
            });
        });
    });

}());

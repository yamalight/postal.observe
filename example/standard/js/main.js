/* global $, postal */
$(function() {
	postal
    .observe({
        channel: 'ChannelA',
        topic: 'topic.on.channel.a'
    })
    .map(function(message) {
        return message + ' - mapped';
    })
    .subscribe(function(message) {
        $('body').append('<div>' + message + '</div>');
    }, function(error) {
        console.error('Oops, error: ', error);
    }, function() {
        $('body').append('<div>Done!</div>');
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

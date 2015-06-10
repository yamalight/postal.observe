# postal.observe

## What is It?
postal.observe is a plugin for [postal.js](https://github.com/ifandelse/postal.js) which enables reactive style subscriptions (using [RxJS](https://github.com/Reactive-Extensions/RxJS)) for a postal message bus.

With postal.observe, you can get a subscription to specific channel using Rx.Observable. Which allows you to do a variety of cool reactive things upon all incoming message (see example below).

```javascript
/**
 * topic - is an array of object literals which specify channel and topic, same as you'd use when doing channel.subsribe()
 * returns Rx.Observable object
 */
var observable = channel.observe(topic);
/**
 * channelDefs - is an array of object literals which specify channel and topic, same as you'd use when doing postal.subsribe()
 * returns Rx.Observable object
 */
var observable = postal.observe(channelDefs);
```

Here's a quick usage example:

```javascript
postal.observe({channel: 'ChannelA', topic: 'topic'})
    .skip(2).take(1).delay(100).subscribe(
        function(body) {
            // handle incoming data here
            // body will equal 'Stream of data' for the given example
        },
        function (err) {
            // handle stream errors here
        },
        function() {
            // handle stream completion here
        }
    );

postal.publish({channel: 'ChannelA', topic: 'topic', data: 'Look'});
postal.publish({channel: 'ChannelA', topic: 'topic', data: 'I am handled as a reactive'});
postal.publish({channel: 'ChannelA', topic: 'topic', data: 'Stream of data'});
postal.publish({channel: 'ChannelA', topic: 'topic', data: 'Via message bus!'});
```

## How to Include It
postal.observe will work in both standard and AMD/require.js environments as well as node.js.
Simply include it in your project (after underscore and postal, if you're not using AMD), and it will automatically add the "observe" method to postal's global object and channel definition.

For node.js, postal.observe returns a factory function which you should invoke and pass in the reference to postal:

```javascript
var postal = require('postal');
require('postal.observe')(postal);
```

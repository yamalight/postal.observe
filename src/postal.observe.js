/* global define */
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        // Node, or CommonJS-Like environments
        module.exports = function(postal) {
            return factory(require('rx'), postal, this);
        };
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['rx', 'postal'], function(Rx, postal) {
            return factory(Rx, postal, root);
        });
    } else {
        // Browser globals
        root.postal = factory(root.Rx, root.postal, root);
    }
}(this, function(Rx, postal, global) {

    //import('observe.js');

    return postal;
}));

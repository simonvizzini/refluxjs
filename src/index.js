exports.ActionMethods = require('./ActionMethods');

exports.ListenerMethods = require('./ListenerMethods');

exports.PublisherMethods = require('./PublisherMethods');

exports.StoreMethods = require('./StoreMethods');

exports.createAction = require('./createAction');

exports.createStore = require('./createStore');

exports.connect = require('./connect');

exports.connectFilter = require('./connectFilter');

exports.ListenerMixin = require('./ListenerMixin');

exports.listenTo = require('./listenTo');

exports.listenToMany = require('./listenToMany');


var maker = require('./joins').staticJoinCreator;

exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility

exports.joinLeading = maker("first");

exports.joinStrict = maker("strict");

exports.joinConcat = maker("all");

var _ = exports.utils = require('./utils');

exports.EventEmitter = _.EventEmitter;

exports.Promise = _.Promise;

/**
 * Convenience function for creating a set of actions
 *
 * @param definitions the definitions for the actions to be created
 * @returns an object with actions of corresponding action names
 */
exports.createActions = (function() {
    var reducer = function(definitions, actions) {
        Object.keys(definitions).forEach(function(actionName) {
            var val = definitions[actionName];
            actions[actionName] = exports.createAction(val);
        });
    };

    return function(definitions) {
        var actions = {};
        if (definitions instanceof Array) {
            definitions.forEach(function(val) {
                if (_.isObject(val)) {
                    reducer(val, actions);
                } else {
                    actions[val] = exports.createAction(val);
                }
            });
        } else {
            reducer(definitions, actions);
        }
        return actions;
    };
})();

/**
 * Sets the eventmitter that Reflux uses
 */
exports.setEventEmitter = function(ctx) {
    exports.EventEmitter = _.EventEmitter = ctx;
};


/**
 * Sets the Promise library that Reflux uses
 */
exports.setPromise = function(ctx) {
    exports.Promise = _.Promise = ctx;
};


/**
 * Sets the Promise factory that creates new promises
 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
 */
exports.setPromiseFactory = function(factory) {
    _.createPromise = factory;
};


/**
 * Sets the method used for deferring actions and stores
 */
exports.nextTick = function(nextTick) {
    _.nextTick = nextTick;
};

/**
 * Provides the set of created actions and stores for introspection
 */
exports.__keep = require('./Keep');

/**
 * Warn if Function.prototype.bind not available
 */
if (!Function.prototype.bind) {
  console.error(
    'Function.prototype.bind not available. ' +
    'ES5 shim required. ' +
    'https://github.com/spoike/refluxjs#es5'
  );
}

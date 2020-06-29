"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var optimized_1 = __importDefault(require("./optimized"));
var bundler_1 = require("./bundler");
var map_1 = require("./map");
exports.isCached = map_1.isCached;
var defaultPreLoadable = {
    cached: true,
    placeholder: null,
    extract: 'default',
};
var i = 0;
var register = function (component) {
    var enhancedComponent = __assign(__assign({ name: "Component" + i++ }, defaultPreLoadable), component);
    var name = enhancedComponent.name;
    if (bundler_1.mapLoadable[name] !== undefined) {
        throw new Error("You try to add new component with already existing name: " + name);
    }
    bundler_1.mapLoadable[name] = enhancedComponent;
    return optimized_1.default(name);
};
exports.register = register;
var component = function (name) { return new Promise(function (resolve, reject) {
    try {
        if (map_1.isCached(name)) {
            resolve();
        }
        else {
            map_1.getComponent(name);
            resolve();
        }
    }
    catch (e) {
        reject(e);
    }
}); };
var group = function (name) {
    var components = Object.keys(bundler_1.mapLoadable).filter(function (componentName) { return bundler_1.mapLoadable[componentName].group === name; });
    return Promise.all(components.map(function (name) { return component(name); }));
};
var preloadAPI = {
    component: component,
    group: group
};
var preload = function () { return preloadAPI; };
exports.preload = preload;

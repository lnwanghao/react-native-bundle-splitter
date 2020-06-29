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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_1 = require("./bundler");
var cache = {};
exports.isCached = function (componentName) { return !!cache[componentName]; };
exports.getComponent = function (name) {
    if (!exports.isCached(name)) {
        var _a = bundler_1.mapLoadable[name], load = _a.require, rest = __rest(_a, ["require"]);
        // @ts-ignore
        var component = load()[rest.extract];
        cache[name] = __assign(__assign({}, rest), { component: component });
    }
    return cache[name];
};

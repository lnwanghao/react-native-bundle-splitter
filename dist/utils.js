"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investigate = function () {
    var modules = require.getModules();
    var moduleIds = Object.keys(modules);
    var loaded = moduleIds
        .filter(function (moduleId) { return modules[moduleId].isInitialized; })
        .map(function (moduleId) { return modules[moduleId].verboseName; });
    var waiting = moduleIds
        .filter(function (moduleId) { return !modules[moduleId].isInitialized; })
        .map(function (moduleId) { return modules[moduleId].verboseName; });
    return { loaded: loaded, waiting: waiting };
};

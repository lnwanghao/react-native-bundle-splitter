"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var map_1 = require("./map");
var bundler_1 = require("./bundler");
var optimized = function (screenName) {
    var _a = bundler_1.mapLoadable[screenName], func = _a.func, _func = _a.require;
    if (func) {
        var cached = map_1.isCached(screenName);
        if (cached) {
            _func = map_1.getComponent(screenName).require;
            return _func;
        }
        return _func;
    }
    else {
        var OptimizedComponent_1 = /** @class */ (function (_super) {
            __extends(OptimizedComponent, _super);
            function OptimizedComponent(props) {
                var _this = _super.call(this, props) || this;
                _this.component = null;
                _this.placeholder = bundler_1.mapLoadable[screenName].placeholder;
                var cached = map_1.isCached(screenName);
                if (cached) {
                    var component = map_1.getComponent(screenName).component;
                    _this.component = component;
                }
                _this.state = {
                    needsExpensive: cached
                };
                return _this;
            }
            OptimizedComponent.prototype.componentDidMount = function () {
                if (this.component === null) {
                    var component = map_1.getComponent(screenName).component;
                    this.component = component;
                    this.setState({ needsExpensive: true });
                }
            };
            OptimizedComponent.prototype.render = function () {
                var BundleComponent = this.component;
                var Placeholder = this.placeholder;
                var PlaceholderComponent = Placeholder ? <Placeholder /> : Placeholder;
                return this.state.needsExpensive && BundleComponent ?
                    <BundleComponent {...this.props}/> : PlaceholderComponent;
            };
            return OptimizedComponent;
        }(React.PureComponent));
        var registerData_1 = bundler_1.mapLoadable[screenName];
        if (registerData_1.static) {
            Object.keys(registerData_1.static).forEach(function (key) {
                // @ts-ignore
                OptimizedComponent_1[key] = registerData_1.static[key];
            });
        }
        return OptimizedComponent_1;
    }
};
exports.default = optimized;

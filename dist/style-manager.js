"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleManager = function () {
    function StyleManager() {
        _classCallCheck(this, StyleManager);

        this.rules = {};
    }

    _createClass(StyleManager, [{
        key: "change",
        value: function change(namespace) {
            var _this = this;

            return Object.assign(this, {
                when: function when(condition) {
                    if (!_this.rules[namespace]) _this.rules[namespace] = [];

                    return Object.assign(_this, {
                        apply: function apply(style) {
                            _this.rules[namespace].push(_this._ruleFactory(condition, style));

                            delete _this.apply;

                            return _this;
                        }
                    });
                }
            });
        }
    }, {
        key: "generate",
        value: function generate() {
            var _this2 = this;

            var _rules = {};

            Object.keys(this.rules).map(function (key) {
                var namespace = _this2.rules[key];
                _rules[key] = {};

                namespace.map(function (rule) {
                    if (rule.when()) _rules[key] = Object.assign(_rules[key], rule.style);
                });
            });

            return _rules;
        }
    }, {
        key: "_ruleFactory",
        value: function _ruleFactory(condition, style) {
            return {
                when: condition,
                style: style
            };
        }
    }]);

    return StyleManager;
}();

exports.default = StyleManager;
;
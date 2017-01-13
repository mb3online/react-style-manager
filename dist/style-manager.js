'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyleManager = function () {
    function StyleManager() {
        _classCallCheck(this, StyleManager);

        this._rules = (0, _immutable.Map)();
    }

    _createClass(StyleManager, [{
        key: 'change',
        value: function change(namespace) {
            var _this = this;

            return Object.assign(this, {
                when: function when(condition) {
                    if (!_this._rules.get(namespace)) _this._rules = _this._rules.set(namespace, (0, _immutable.List)());

                    return Object.assign(_this, {
                        apply: function apply(style) {
                            _this._rules = _this._rules.set(namespace, _this._rules.get(namespace).push(_this._ruleFactory(condition, style)));
                            delete _this.apply;

                            return _this;
                        }
                    });
                }
            });
        }
    }, {
        key: 'generate',
        value: function generate() {
            var styles = (0, _immutable.Map)();

            this._rules.map(function (namespace, key) {
                styles = styles.set(key, (0, _immutable.Map)());
                namespace.map(function (rule) {
                    if (rule.when()) styles = styles.set(key, styles.get(key).merge(rule.style));
                });
            });

            return styles.toJS();
        }
    }, {
        key: '_ruleFactory',
        value: function _ruleFactory(condition, style) {
            return {
                when: condition,
                style: style
            };
        }
    }, {
        key: 'rules',
        get: function get() {
            return this._rules.toJS();
        },
        set: function set(rules) {
            this._rules = rules;
        }
    }]);

    return StyleManager;
}();

exports.default = StyleManager;
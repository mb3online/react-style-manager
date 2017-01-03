import { Map, List } from 'immutable';

export default class StyleManager {
    constructor() {
        this._rules = Map();
    }

    get rules() {
        return this._rules.toJS();
    }

    set rules(rules) {
        this._rules = rules;
    }

    change(namespace) {
        return Object.assign(this, {
            when: condition => {
                if (!this._rules.get(namespace)) this._rules = this._rules.set(namespace, List([]));

                return Object.assign(this, {
                    apply: style => {
                        this._rules = this._rules
                            .set(namespace, this._rules
                                .get(namespace).push(this._ruleFactory(condition, style)));
                        delete this.apply;

                        return this;
                    },
                });
            },
        });
    }

    generate() {
        let _rules = Map();

        this._rules.map((namespace, key) => {
            _rules = _rules.set(key, Map());
            namespace.map(rule => {
                if (rule.when()) _rules = _rules.set(key, _rules.get(key).merge(rule.style));
            });
        });

        return _rules.toJS();
    }

    _ruleFactory(condition, style) {
        return {
            when: condition,
            style: style,
        };
    }
}

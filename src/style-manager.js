export default class StyleManager {
    constructor() {
        this.rules = {};
    }

    change(namespace) {
        return Object.assign(this, {
            when: condition => {
                if (!this.rules[namespace]) this.rules[namespace] = [];

                return Object.assign(this, {
                    apply: style => {
                        this.rules[namespace].push(this._ruleFactory(condition, style));

                        delete this.apply;

                        return this;
                    },
                });
            },
        });
    }

    generate() {
        const _rules = {};

        Object.keys(this.rules)
            .map(key => {
                const namespace = this.rules[key];
                _rules[key] = {};

                namespace.map(rule => {
                    if (rule.when()) _rules[key] = Object.assign(_rules[key], rule.style);
                });
            });

        return _rules;
    }

    _ruleFactory(condition, style) {
        return {
            when: condition,
            style: style,
        };
    }
};

import React from 'react';
import Manager from './style-manager';

export default Component => class StyleManager extends React.Component {
    constructor(props) {
        super(props);

        this.manager = new Manager();
        Object.assign(this, this.manager);
    }

    ref() {
        return this.child;
    }

    render() {
        const render = (
            <Component
                styleManager={this.manager}
                ref={r => this.child = r}
                {...this.props}
            />
        );

        return render;
    }
};

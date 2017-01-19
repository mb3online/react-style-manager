import React from 'react';
import Manager from './style-manager';

export default Component => class StyleManager extends React.Component {
    constructor(props) {
        super(props);

        this.manager = new Manager();
        Object.assign(this, this.manager);
    }

    render() {
        const {
            childRef,
            ...rest
        } = this.props;

        return (
            <Component
                {...rest}
                styleManager={this.manager}
                ref={childRef}
            />
        );
    }
};

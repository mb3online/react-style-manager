import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import StyleManager from '../src/index';

describe('StyleManager', () => {
    let renderer;
    const TestComponent = React.createClass({
        propTypes: { styles: React.PropTypes.object.isRequired },
        render: () => null,
    });

    beforeEach(() => {
        renderer = ReactTestUtils.createRenderer();
    });

    it('should contain the `styles` prop', () => {
        // Arrange
        const Test = StyleManager(TestComponent);

        // Act
        renderer.render(<Test />);
        const wrapper = renderer.getRenderOutput();

        // Assert
        expect(Object.keys(wrapper.props).includes('styles')).toBeTruthy();
    });
});

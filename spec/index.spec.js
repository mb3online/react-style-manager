import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import StyleManager from '../src/index';
import RefTest from './helpers/ref.jsx';

import { shallow, mount } from 'enzyme';

describe('StyleManager', () => {
    let renderer;

    beforeEach(() => {
        renderer = ReactTestUtils.createRenderer();
    });

    it('should contain the `styleManager` prop', () => {
        // Arrange
        const Test = StyleManager(() => null);

        // Act
        renderer.render(<Test />);
        const wrapper = renderer.getRenderOutput();

        // Assert
        expect(Object.keys(wrapper.props).includes('styleManager')).toBeTruthy();
    });

    it('should contain the ref to the component contained in the composite stylemanager', () => {
        // Arrange
        const Composite = StyleManager(RefTest);
        let ref = null;
        let wrapper = null;

        // Act
        wrapper = mount(<Composite childRef={r => ref = r}/>);

        // Assert
        // expect(wrapper.instance().child instanceof RefTest).toBeTruthy();
        // expect(wrapper.instance().ref() instanceof RefTest).toBeTruthy();
        expect(ref instanceof RefTest).toBeTruthy();
    });

    it('should push props through to the child component', () => {
        // Arrange
        const props = { someValue: true };
        const Composite = StyleManager(RefTest);
        const Raw = <RefTest {...props}/>;

        let wrapper = null;

        // Act
        renderer.render(<Composite {...props}/>);
        wrapper = renderer.getRenderOutput();

        // Assert
        expect(wrapper.props.someValue).toEqual(Raw.props.someValue);
    });
});

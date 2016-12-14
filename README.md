# react-style-manager

[![CircleCI](https://circleci.com/gh/mb3online/react-style-manager.svg?style=shield&circle-token=91dc3f3ee64e7396e268b64d2bb70b243e79e73b)](https://circleci.com/gh/mb3online/react-style-manager)

A react package to more easily manage the stateful styling of your components.

## Getting started

1. Run `npm install react-style-manager --save` to install the package in your application.

2. Call the `StyleManager` composite function, passing through your component.

3. Register your styling rules in your components' constructor, defining the conditions and applicable styles for each rule.


An example of the implementation code for a given `SimpleButton` component:

```javascript
    import StyleManager from 'react-style-manager';

    class SimpleButton extends React.Component{
        constructor(props) {
            super(props)

            const { styles } = this.props;

            styles
                .change('root')
                .when(this.isDisabled)
                .apply({
                    opacity: 0.8,
                    cursor: 'not-allowed',
                });

            styles
                .change('button')
                .when(this.isDisabled)
                .apply({
                    color: '#a7a7a7',
                })
                .when(this.isHovered)
                .apply({
                    boxShadow: '2px 4px 7px 0px rgba(167,167,167,1)',
                });
        }

        isDisabled() {
            return !!this.props.disabled;
        }

        isHovered() {
            return !!this.state.hovered;
        }

        render() {
            const styleManager = this.props.styles;
            const styles = styleManager.generate();

            <div style={styles.root}>
                <button style={styles.button}></button>
            </div>
        }
    }

    export default StyleManager(SimpleButton);
```

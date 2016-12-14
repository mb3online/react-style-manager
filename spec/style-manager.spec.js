import StyleManager from '../src/style-manager';

describe('StyleManager', () => {
    let style;

    beforeEach(() => style = new StyleManager());

    it('should properly change the style', () => {
        // Arrange
        const expectedStyles = { namespace: { backgroundColor: 'red' } };

        style
            .change('namespace')
            .when(() => true)
            .apply(expectedStyles.namespace);

        // Act
        const resultingStyles = style.generate();

        // Assert
        expect(resultingStyles).toEqual(expectedStyles);
    });

    it('should return an empty namespaced style if no styles apply', () => {
        // Arrange
        const expectedStyles = { namespace: {} };

        style
            .change('namespace')
            .when(() => false)
            .apply({ backgroundColor: 'red' });

        // Act
        const resultingStyles = style.generate();

        // Assert
        expect(resultingStyles).toEqual(expectedStyles);
    });

    it('should allow to create multiple styling rules for the same namespace', () => {
        // arrange
        const ruleNamespace = 'namespace';

        // act
        style.change(ruleNamespace)
            .when(() => true)
            .apply({});

        style.change(ruleNamespace)
            .when(() => true)
            .apply({});

        // assert
        expect(style.rules[ruleNamespace].length).toBe(2);
    });

    it('should allow defining many styles through chaining', () => {
        // arrange
        const ruleNamespace = 'namespace';

        // act
        style
            .change(ruleNamespace)
            .when(() => true)
            .apply({})
            .when(() => true)
            .apply({});

        // assert
        expect(style.rules[ruleNamespace].length).toBe(2);
    });

    it('should allow defining multiple style rule namespaces', () => {
        // arrange
        const ruleNamespaces = [ 'namespace1', 'namespace2' ];

        // act
        ruleNamespaces.map(namespace => {
            style
                .change(namespace)
                .when(true)
                .apply({});
        });

        // assert
        Object.keys(style.rules).map(key =>
            expect(style.rules[key].length).toBe(1));
    });

    it('should properly merge styles', () => {
        // arrange
        const firstNamespaceStyles = {
            backgroundColor: 'black',
            color: 'green',
        };
        const secondNamespaceStyles = {
            backgroundColor: 'orange',
            textSize: 12,
        };
        const expectedStyles = { namespace: Object.assign({}, firstNamespaceStyles, secondNamespaceStyles) };

        style
            .change('namespace')
            .when(() => true)
            .apply(firstNamespaceStyles);

        style
            .change('namespace')
            .when(() => true)
            .apply(secondNamespaceStyles);

        // act
        const resultingStyles = style.generate();

        // assert
        expect(resultingStyles).toEqual(expectedStyles);
    });

    it('should not merge styles when conditions do not apply', () => {
        // arrange
        const applicableStyles = {
            color: 'green',
            backgroundColor: 'violet',
        };

        const nonApplicableStyles = {
            backgroundColor: 'black',
            color: 'green',
        };

        const expectedStyles = { namespace: Object.assign({}, applicableStyles) };

        style
            .change('namespace')
            .when(() => false)
            .apply(nonApplicableStyles);

        style
            .change('namespace')
            .when(() => true)
            .apply(applicableStyles);

        // act
        const resultingStyles = style.generate();

        // assert
        expect(resultingStyles).toEqual(expectedStyles);
    });
});

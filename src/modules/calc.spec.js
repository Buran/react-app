const Calculator = require('./calc');

test('adds 1 + 2 to equal 3', () => {
    import('./calc').then(Calculator => {
        expect(Calculator.sum(1, 2)).toBe(3);
    });
});

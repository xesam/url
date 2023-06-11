const CompatSearchParams = require('../lib/CompatURLSearchParams');

describe('CompatURLSearchParams', () => {
    let theCompatSearchParams;
    let theURLSearchParams;
    beforeEach(() => {
        theCompatSearchParams = new CompatSearchParams();
        theURLSearchParams = new URLSearchParams();
    });

    test('when get a non-exist name then return null', () => {
        expect(theCompatSearchParams.get('none')).toBeNull();
        expect(theCompatSearchParams.get('none')).toBe(theURLSearchParams.get('none'));
    });

    test('when get then return the first value', () => {
        theCompatSearchParams.append('a', '1');
        theCompatSearchParams.append('a', '2');
        theURLSearchParams.append('a', '1');
        theURLSearchParams.append('a', '2');
        expect(theCompatSearchParams.get('a')).toEqual('1');
        expect(theCompatSearchParams.get('a')).toEqual(theURLSearchParams.get('a'));
    });

    test('when getAll then return a list', () => {
        theCompatSearchParams.append('a', '1');
        theCompatSearchParams.append('a', '2');
        theURLSearchParams.append('a', '1');
        theURLSearchParams.append('a', '2');
        expect(theCompatSearchParams.getAll('a')).toEqual(['1', '2']);
        expect(theCompatSearchParams.getAll('a')).toEqual(theURLSearchParams.getAll('a'));
    });

    test('when update a name then return the new value', () => {
        theCompatSearchParams.append('a', '1');
        theCompatSearchParams.append('a', '2');
        theCompatSearchParams.set('a', '3');
        theURLSearchParams.append('a', '1');
        theURLSearchParams.append('a', '2');
        theURLSearchParams.set('a', '3');
        expect(theCompatSearchParams.get('a')).toEqual('3');
        expect(theCompatSearchParams.get('a')).toEqual(theURLSearchParams.get('a'));
    });

    test('when the name exists then return true', () => {
        theCompatSearchParams.append('a', '1');
        theURLSearchParams.append('a', '1');
        expect(theCompatSearchParams.has('a')).toBeTruthy();
        expect(theCompatSearchParams.has('a')).toEqual(theURLSearchParams.has('a'));
    });

    test('when delete a exist name then remove it', () => {
        theCompatSearchParams.append('b', '3');
        theCompatSearchParams.delete('b');
        theURLSearchParams.append('b', '3');
        theURLSearchParams.delete('b');
        expect(theCompatSearchParams.has('b')).toBeFalsy();
        expect(theCompatSearchParams.has('b')).toEqual(theURLSearchParams.has('b'));
    });
});
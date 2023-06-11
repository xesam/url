const createURL = require('../lib/url-compat');
const CompatURL = require('../lib/CompatURL');

describe('createURL', () => {
    test('when create with tryNative=false then use CompatURL', () => {
        const testUrlObject = createURL('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v');
        expect(testUrlObject).toBeInstanceOf(CompatURL);
    });
});
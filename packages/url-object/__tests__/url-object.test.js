const UrlObject = require('../lib/url-object');
const CompatURL = require('../lib/CompatURL');

describe('UrlObject', () => {
    let testUrlObject;
    beforeEach(() => {
        testUrlObject = UrlObject('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v');
    });

    test('when create with tryNative=false then use CompatURL', () => {
        expect(testUrlObject).toBeInstanceOf(CompatURL);
    });
});
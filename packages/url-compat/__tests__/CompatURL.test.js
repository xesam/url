const CompatURL = require('../lib/CompatURL');

describe('CompatURL', () => {
    let urlStr;
    beforeEach(() => {
        urlStr = 'https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v';
    });

    test('when parse url then return a url object', () => {
        const cu = new CompatURL(urlStr);
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v');
    });

    test('when set hash then update hash', () => {
        const cu = new CompatURL(urlStr);
        cu.hash = 'new-hash';
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v#new-hash');
    });

    test('when set username then update username', () => {
        const cu = new CompatURL(urlStr);
        cu.username = 'xesam';
        expect(cu.href).toEqual('https://xesam:raw-root@raw-host:443/raw-path?k=raw-v');
    });

    test('when set password then update password', () => {
        const cu = new CompatURL(urlStr);
        cu.password = 'new-root';
        expect(cu.href).toEqual('https://raw-admin:new-root@raw-host:443/raw-path?k=raw-v');
    });

    test('when set pathname then update pathname', () => {
        const cu = new CompatURL(urlStr);
        cu.pathname = 'new-path';
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/new-path?k=raw-v');
    });

    test('when set hostname then update hostname', () => {
        const cu = new CompatURL(urlStr);
        cu.hostname = 'new-host';
        expect(cu.href).toEqual('https://raw-admin:raw-root@new-host:443/raw-path?k=raw-v');
    });

    test('when append params then update search', () => {
        const cu = new CompatURL(urlStr);
        cu.searchParams.append('k', 'v2');
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v&k=v2');
    });

    test('when set hash with empty then remove hash', () => {
        const cu = new CompatURL(urlStr);
        cu.hash = 'new-hash';
        cu.hash = '';
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/raw-path?k=raw-v');
    });

    test('when delete params then update search', () => {
        const cu = new CompatURL(urlStr);
        cu.searchParams.delete('k');
        expect(cu.href).toEqual('https://raw-admin:raw-root@raw-host:443/raw-path');
    });
})
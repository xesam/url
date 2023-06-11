const UrlObject = require('../lib/UrlObject');

describe('UrlObject', () => {
    function createTestUrlObject(href) {
        return new UrlObject(href);
    }

    test('when create a new UrlObject with nothing then all attributes are undefined', () => {
        const testUrlObject = createTestUrlObject();

        expect(testUrlObject.protocol()).toBeUndefined();
        expect(testUrlObject.auth()).toBeUndefined();
        expect(testUrlObject.username()).toBeUndefined();
        expect(testUrlObject.password()).toBeUndefined();
        expect(testUrlObject.host()).toBeUndefined();
        expect(testUrlObject.hostname()).toBeUndefined();
        expect(testUrlObject.port()).toBeUndefined();
        expect(testUrlObject.path()).toBeUndefined();
        expect(testUrlObject.pathname()).toBeUndefined();
        expect(testUrlObject.search()).toBeUndefined();
        expect(testUrlObject.hash()).toBeUndefined();
    });

    test('when create a new UrlObject with nothing then the query is null', () => {
        const testUrlObject = createTestUrlObject();

        expect(testUrlObject.query).toBeNull();
    });

    test('when create a new UrlObject with url-string then all attributes are init', () => {
        const testUrlObject = createTestUrlObject('the_protocol://the_username:the_password@the_hostname:8888/the_pathname?the_key=the_value#the_hash');

        expect(testUrlObject.protocol()).toBe('the_protocol:');
        expect(testUrlObject.auth()).toBe('the_username:the_password');
        expect(testUrlObject.username()).toBe('the_username');
        expect(testUrlObject.password()).toBe('the_password');
        expect(testUrlObject.host()).toBe('the_hostname:8888');
        expect(testUrlObject.hostname()).toBe('the_hostname');
        expect(testUrlObject.port()).toBe('8888');
        expect(testUrlObject.path()).toBe('/the_pathname?the_key=the_value');
        expect(testUrlObject.pathname()).toBe('/the_pathname');
        expect(testUrlObject.search()).toBe('?the_key=the_value');
        expect(testUrlObject.hash()).toBe('#the_hash');
    });

    test('when create a new UrlObject with url-string then query is init', () => {
        const testUrlObject = createTestUrlObject('the_protocol://the_username:the_password@the_hostname:8888/the_pathname?the_key=the_value#the_hash');

        expect(testUrlObject.query.has('the_key')).toBeTruthy();
        expect(testUrlObject.query.get('the_key')).toBe('the_value');
        expect(testUrlObject.query.toString()).toContain('the_key=the_value');
    });

    test('when set protocol then update protocol only', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.protocol(' https: ');
        expect(testUrlObject.protocol()).toBe('https:');
        testUrlObject.protocol('https');
        expect(testUrlObject.protocol()).toBe('https:');
        testUrlObject.protocol('https://');
        expect(testUrlObject.protocol()).toBe('https:');
    });

    test('when set protocol with falsy then clear the protocol', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.protocol('http');
        testUrlObject.protocol(null);

        expect(testUrlObject.protocol()).toBeUndefined();
    });

    test('when set auth with username&password then update username and password', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.auth(' username :  password ');

        expect(testUrlObject.auth()).toBe('username:password');
        expect(testUrlObject.username()).toBe('username');
        expect(testUrlObject.password()).toBe('password');
    });

    test('when set auth with falsy then clear username and password', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.auth(null);

        expect(testUrlObject.auth()).toBeUndefined();
        expect(testUrlObject.username()).toBeUndefined();
        expect(testUrlObject.password()).toBeUndefined();
    });

    test('when set auth with username then update username and clear password', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.auth(' username  ');

        expect(testUrlObject.auth()).toBe('username');
        expect(testUrlObject.username()).toBe('username');
        expect(testUrlObject.password()).toBeUndefined();
    });

    test('when set username then update username but keep password', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.auth(' username :  password ');

        testUrlObject.username(' new_username ');

        expect(testUrlObject.auth()).toBe('new_username:password');
        expect(testUrlObject.username()).toBe('new_username');
        expect(testUrlObject.password()).toBe('password');
    });

    test('when set username with falsy then clear username but keep password', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.auth(' username :  password ');

        testUrlObject.username(null);

        expect(testUrlObject.auth()).toBe(':password');
        expect(testUrlObject.username()).toBeUndefined();
        expect(testUrlObject.password()).toBe('password');
    });

    test('when set password then update password and keep username', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.auth(' username :  password ');

        testUrlObject.password(' new_password ');

        expect(testUrlObject.auth()).toBe('username:new_password');
        expect(testUrlObject.username()).toBe('username');
        expect(testUrlObject.password()).toBe('new_password');
    });

    test('when set password with falsy then clear password but keep username', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.auth(' username :  password ');

        testUrlObject.password(null);

        expect(testUrlObject.auth()).toBe('username');
        expect(testUrlObject.username()).toBe('username');
        expect(testUrlObject.password()).toBeUndefined();
    });

    test('when set host with hostname&port then update hostname and port', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.host(' hostname :  80 ');

        expect(testUrlObject.host()).toBe('hostname:80');
        expect(testUrlObject.hostname()).toBe('hostname');
        expect(testUrlObject.port()).toBe('80');
    });

    test('when set host with hostname then update hostname and clear port', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.host(' hostname    ');

        expect(testUrlObject.host()).toBe('hostname');
        expect(testUrlObject.hostname()).toBe('hostname');
        expect(testUrlObject.port()).toBeUndefined();
    });

    test('when set host with falsy then clear hostname and port', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.host(' hostname :  80 ');

        testUrlObject.host(null);

        expect(testUrlObject.host()).toBeUndefined();
        expect(testUrlObject.hostname()).toBeUndefined();
        expect(testUrlObject.port()).toBeUndefined();
    });

    test('when set hostname then update hostname and keep port', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.host(' hostname :  80 ');

        testUrlObject.hostname(' new_hostname ');

        expect(testUrlObject.host()).toBe('new_hostname:80');
        expect(testUrlObject.hostname()).toBe('new_hostname');
        expect(testUrlObject.port()).toBe('80');
    });

    test('when set hostname with falsy then clear hostname and keep port', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.host(' hostname :  80 ');

        testUrlObject.hostname(null);

        expect(testUrlObject.host()).toBe(':80');
        expect(testUrlObject.hostname()).toBeUndefined();
        expect(testUrlObject.port()).toBe('80');
    });

    test('when set port then update port and keep hostname', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.host(' hostname :  80 ');

        testUrlObject.port(' 8000 ');

        expect(testUrlObject.host()).toBe('hostname:8000');
        expect(testUrlObject.hostname()).toBe('hostname');
        expect(testUrlObject.port()).toBe('8000');
    });

    test('when set port with falsy then clear hostname and keep port', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.host(' hostname :  80 ');

        testUrlObject.port(null);

        expect(testUrlObject.host()).toBe('hostname');
        expect(testUrlObject.hostname()).toBe('hostname');
        expect(testUrlObject.port()).toBeUndefined();
    });

    test('when set path then update pathname and search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');
        expect(testUrlObject.path()).toBe('/part1/part2?k1=v1&k2=v2');

        testUrlObject.path('/part1/part2?k1=v1&k2=v2#hash1');
        expect(testUrlObject.path()).toBe('/part1/part2?k1=v1&k2=v2');

        testUrlObject.path('part1/part2?k1=v1&k2=v2');
        expect(testUrlObject.path()).toBe('/part1/part2?k1=v1&k2=v2');

        testUrlObject.path('/part1/part2');
        expect(testUrlObject.path()).toBe('/part1/part2');

        testUrlObject.path('?k1=v1&k2=v2#hash1');
        expect(testUrlObject.path()).toBe('?k1=v1&k2=v2');

        testUrlObject.path('#hash1');
        expect(testUrlObject.path()).toBeUndefined();
    });

    test('when set path with falsy then clear pathname and search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.path(null);

        expect(testUrlObject.path()).toBeUndefined();
        expect(testUrlObject.pathname()).toBeUndefined();
        expect(testUrlObject.search()).toBeUndefined();
    });

    test('when set pathname then update path and keep search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.pathname('/new_part1/new_part2');
        expect(testUrlObject.path()).toBe('/new_part1/new_part2?k1=v1&k2=v2');

        testUrlObject.pathname('new_part1/new_part2');
        expect(testUrlObject.path()).toBe('/new_part1/new_part2?k1=v1&k2=v2');

        testUrlObject.pathname('/');
        expect(testUrlObject.path()).toBe('/?k1=v1&k2=v2');

        testUrlObject.pathname('');
        expect(testUrlObject.path()).toBe('?k1=v1&k2=v2');
    });

    test('when set pathname with falsy then clear path but keep search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.pathname(null);

        expect(testUrlObject.path()).toBe('?k1=v1&k2=v2');
        expect(testUrlObject.pathname()).toBeUndefined();
    });

    test('when set search then update search and keep others', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.search('?k1=new_v1&new_k2=v2');
        expect(testUrlObject.path()).toBe('/part1/part2?k1=new_v1&new_k2=v2');

        testUrlObject.search('?');
        expect(testUrlObject.path()).toBe('/part1/part2');

        testUrlObject.search('');
        expect(testUrlObject.path()).toBe('/part1/part2');
    });

    test('when set search with falsy then clear search but keep others', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.search(null);

        expect(testUrlObject.path()).toBe('/part1/part2');
        expect(testUrlObject.pathname()).toBe('/part1/part2');
        expect(testUrlObject.search()).toBeUndefined();
    });

    test('when set query then update query and search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.query.set('k1', 'new_v1');
        testUrlObject.query.set('new_k2', 'v2');

        expect(testUrlObject.search()).toContain('k1=new_v1');
        expect(testUrlObject.search()).toContain('k2=v2');
        expect(testUrlObject.search()).toContain('new_k2=v2');
    });

    test('when remove query then update query and search', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.path('/part1/part2?k1=v1&k2=v2');

        testUrlObject.query.remove('k1');
        testUrlObject.query.remove('k2');

        expect(testUrlObject.path()).toBe('/part1/part2');
    });

    test('when set hash then update hash only', () => {
        const testUrlObject = createTestUrlObject();

        testUrlObject.hash(' hash ');
        expect(testUrlObject.hash()).toBe('#hash');
        testUrlObject.hash('#hash');
        expect(testUrlObject.hash()).toBe('#hash');
        testUrlObject.hash('##hash');
        expect(testUrlObject.hash()).toBe('##hash');
    });

    test('when set hash with falsy then clear hash', () => {
        const testUrlObject = createTestUrlObject();
        testUrlObject.hash('hash');

        testUrlObject.hash(null);

        expect(testUrlObject.hash()).toBeUndefined();
    });

});
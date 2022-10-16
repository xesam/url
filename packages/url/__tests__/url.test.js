const url = require('../lib/url');

describe('url', () => {
    test('when url is null then return empty', () => {
        const urls = url(null);
        expect(urls).toStrictEqual({});
    });

    test('when url is a blank string then all parts are undefined', () => {
        const urls = url('  ');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: undefined,
            search: undefined,
            query: undefined,
            hash: undefined
        });
    });

    test('when url is {protocol}://{hostname} then return protocol, host, hostname', () => {
        const urls = url('https://xesam.github.io');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io',
            hostname: 'xesam.github.io',
            port: undefined,
            pathname: undefined,
            search: undefined,
            query: undefined,
            hash: undefined
        });
    });

    test('when url is {protocol}://{hostname}:{port} then return protocol,hostname,port', () => {
        const urls = url('https://xesam.github.io:443');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io:443',
            hostname: 'xesam.github.io',
            port: '443',
            pathname: undefined,
            search: undefined,
            query: undefined,
            hash: undefined
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port} then return protocol,auth,host,hostname,port', () => {
        const urls = url('https://admin:root@xesam.github.io:443');
        expect(urls).toStrictEqual({
            auth: 'admin:root',
            port: '443',
            pathname: undefined,
            search: undefined,
            query: undefined,
            hash: undefined,
            protocol: 'https:',
            host: 'xesam.github.io:443',
            hostname: 'xesam.github.io'
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port}{path} then return protocol,auth,host,hostname,port,path', () => {
        const urls = url('https://admin:root@xesam.github.io:80/');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: 'admin:root',
            host: 'xesam.github.io:80',
            hostname: 'xesam.github.io',
            port: '80',
            pathname: '/',
            search: undefined,
            query: undefined,
            hash: undefined
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port}{path}?{query} then return protocol,auth,hostname,port,path,query', () => {
        const urls = url('https://admin:root@xesam.github.io:80/p/a/t/h?name=xesam');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: 'admin:root',
            host: 'xesam.github.io:80',
            hostname: 'xesam.github.io',
            port: '80',
            pathname: '/p/a/t/h',
            search: '?name=xesam',
            query: 'name=xesam',
            hash: undefined
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port}{path}?{query}{hash} then return protocol,auth,hostname,port,path,query,hash', () => {
        const urls = url('https://admin:root@xesam.github.io:80/p/a/t/h?name=xesam#the-hash');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: 'admin:root',
            host: 'xesam.github.io:80',
            hostname: 'xesam.github.io',
            port: '80',
            pathname: '/p/a/t/h',
            search: '?name=xesam',
            query: 'name=xesam',
            hash: '#the-hash'
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port}?{query} then return protocol,auth,hostname,port,query', () => {
        const urls = url('https://admin:root@xesam.github.io:80?name=xesam');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: 'admin:root',
            host: 'xesam.github.io:80',
            hostname: 'xesam.github.io',
            port: '80',
            pathname: undefined,
            search: '?name=xesam',
            query: 'name=xesam',
            hash: undefined
        });
    });

    test('when url is {protocol}://{name}:{password}@{hostname}:{port}{path}?{query}{hash} then return protocol,auth,hostname,port,path,search,query,hash', () => {
        const urls = url('https://xesam.github.io:80/abc/def?name=xesam&age=18#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io:80',
            hostname: 'xesam.github.io',
            port: '80',
            pathname: '/abc/def',
            search: '?name=xesam&age=18',
            query: 'name=xesam&age=18',
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {protocol}://{hostname}{path}?{query}{hash} then return protocol,hostname,path,query,hash', () => {
        const urls = url('https://xesam.github.io/ab/c/?name=xesam&age=18#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io',
            hostname: 'xesam.github.io',
            port: undefined,
            pathname: '/ab/c/',
            search: '?name=xesam&age=18',
            query: 'name=xesam&age=18',
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {protocol}://{hostname}?{query}{hash} then return protocol,hostname,search,query,hash', () => {
        const urls = url('https://xesam.github.io?name=xesam&age=18#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io',
            hostname: 'xesam.github.io',
            port: undefined,
            pathname: undefined,
            search: '?name=xesam&age=18',
            query: 'name=xesam&age=18',
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {protocol}://{password}@{hostname}{path}{hash} then return protocol,hostname,path,hash', () => {
        const urls = url('https://xesam.github.io/#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io',
            hostname: 'xesam.github.io',
            port: undefined,
            pathname: '/',
            search: undefined,
            query: undefined,
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {protocol}://{hostname}{hash} then return protocol,hostname,hash', () => {
        const urls = url('https://xesam.github.io#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: 'https:',
            auth: undefined,
            host: 'xesam.github.io',
            hostname: 'xesam.github.io',
            port: undefined,
            pathname: undefined,
            search: undefined,
            query: undefined,
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {path} then return path', () => {
        const urls = url('/abc');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: '/abc',
            search: undefined,
            query: undefined,
            hash: undefined
        });
    });

    test('when url is {path}? then return path,search,query', () => {
        const urls = url('/abc?');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: '/abc',
            search: '?',
            query: '',
            hash: undefined
        });
    });

    test('when url is {path}?{query} then return path,search,query', () => {
        const urls = url('/abc?name=xesam#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: '/abc',
            search: '?name=xesam',
            query: 'name=xesam',
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {path}?{query}{hash} then return path,search,query,hash', () => {
        const urls = url('/abc?name=xesam#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: '/abc',
            search: '?name=xesam',
            query: 'name=xesam',
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });

    test('when url is {path}{hash} then return path,hash', () => {
        const urls = url('/abc#t=123456?a[0]=100&a[1]=200&b=');
        expect(urls).toStrictEqual({
            protocol: undefined,
            auth: undefined,
            host: undefined,
            hostname: undefined,
            port: undefined,
            pathname: '/abc',
            search: undefined,
            query: undefined,
            hash: '#t=123456?a[0]=100&a[1]=200&b='
        });
    });
});
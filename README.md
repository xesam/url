# URL

URL utils with Vanilla Javascript.

## url parse

Parse url string with RegExp.

```shell script
npm install @xesam/url
```

Usage:

```javascript
const url = require('@xesam/url');
const comps = url('https://admin:root@www.chelaile.net.cn:80/abc/def?name=xesam#fragment?a=b#c=d');
```

Output:

```json5
{
    protocol: 'https:',
    auth: 'admin:root',
    host: 'www.chelaile.net.cn:80',
    hostname: 'www.chelaile.net.cn',
    port: '80',
    pathname: '/abc/def',
    search: '?name=xesam',
    query: 'name=xesam',
    hash: '#fragment?a=b#c=d'
}
```

## url object

```shell script
npm install @xesam/url-object
```

Usage









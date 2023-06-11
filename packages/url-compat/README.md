# `@xesam/url-compat`

URL and URLSearchParams Compat.

## Usage

```shell script
npm install @xesam/url-compat
```

```javascript
const createURL = require('@xesam/url-compat');
const urlObj = createURL('https://admin:root@ahost:443/apath?k=v');

urlObj.hash = 'ahash';
console.log(urlObj.href) // https://admin:root@ahost:443/apath?k=v#ahash
```

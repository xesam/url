# `@xesam/url-object`

A simple URL modifier.

## Usage
```shell script
npm install @xesam/url-object
```

```javascript
const urlObject = require('@xesam/url-object');
const cu = urlObject('https://admin:root@ahost:443/apath?k=v');

cu.hash = 'ahash';
console.log(cu.href) // https://admin:root@ahost:443/apath?k=v#ahash
```

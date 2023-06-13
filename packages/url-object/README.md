# `@xesam/url-object`

A simple URL modifier.

## Usage

```shell script
npm install @xesam/url-object
```

```javascript
const {UrlObject} = require('@xesam/url-object');
const urlObject = new UrlObject('https://admin:root@ahost:443/apath?k=v');

urlObject.hash('ahash');
console.log(cu.toString()) // https://admin:root@ahost:443/apath?k=v#ahash
```

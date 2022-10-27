const CompatURL = require('./CompatURL');
const _Native_URL = typeof URL === 'function' ? URL : (typeof webkitURL === "function" ? webkitURL : CompatURL);

function parse(url, tryNative = false) {
    if (tryNative) {
        return new _Native_URL(url);
    } else {
        return new CompatURL(url);
    }
}

module.exports = parse;
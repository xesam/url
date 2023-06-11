const url = require('@xesam/url');
const _URLSearchParams = require('./CompatURLSearchParams');

function valid(str) {
    return !!str;
}

class CompatURL {
    constructor(urlString, base) {
        if (base) {
            throw Error('not support base parameter');
        }
        this._init(urlString);
    }

    _init(urlString) {
        this._comps = url(urlString);
        this._searchParams = new _URLSearchParams(this._comps['search']);
    }

    get hash() {
        return this._comps['hash'] || '';
    }

    set hash(value) {
        value = String(value);
        if (value === '') {
            this._comps['hash'] = '';
            return;
        }
        if (!value.startsWith('#')) {
            value = '#' + value
        }
        this._comps['hash'] = value;
    }

    get host() {
        if (valid(this.port)) {
            return this.hostname + ':' + this.port;
        } else {
            return this.hostname;
        }
    }

    set host(value) {
        this._comps['host'] = value;
        const [name, port] = value.split(':');
        this.hostname = name;
        this.port = port || '';
    }

    get hostname() {
        return this._comps['hostname'] || '';
    }

    set hostname(value) {
        this._comps['hostname'] = value;
    }

    get href() {
        return this.toString();
    }

    set href(value) {
        this._init(value);
    }

    get origin() {
        throw Error('no implement');
    }

    set origin(value) {
        throw Error('no implement');
    }

    get password() {
        const auth = this._comps['auth'] || '';
        return auth.split(':')[1] || '';
    }

    set password(value) {
        this._comps['auth'] = [this.username, value].join(':');
    }

    get pathname() {
        return this._comps['pathname'] || '';
    }

    set pathname(value) {
        value = String(value);
        if (!value.startsWith('/')) {
            value = '/' + value
        }
        this._comps['pathname'] = value;
    }

    get port() {
        return this._comps['port'] || '';
    }

    set port(value) {
        this._comps['port'] = value;
    }

    get protocol() {
        return this._comps['protocol'] || '';
    }

    set protocol(value) {
        value = String(value);
        if (!value.endsWith(':')) {
            value = value + ":"
        }
        this._comps['protocol'] = value;
    }

    get search() {
        const searchStr = this._searchParams.toString();
        if (valid(searchStr)) {
            return '?' + searchStr;
        }
        return '';
    }

    set search(value) {
        this._searchParams = new _URLSearchParams(value);
    }

    get searchParams() {
        return this._searchParams;
    }

    set searchParams(value) {
        throw Error('no implement');
    }

    get username() {
        const auth = this._comps['auth'] || '';
        return auth.split(':')[0] || '';
    }

    set username(value) {
        this._comps['auth'] = [value, this.password].join(':');
    }

    toString() {
        let uStr = '';
        if (valid(this.protocol)) {
            uStr += this.protocol + '//'
        }
        if (valid(this._comps['auth'])) {
            uStr += this._comps['auth'] + '@';
        }
        uStr += this.host;
        if (valid(this.pathname)) {
            uStr += this.pathname;
        }
        uStr += this.search;
        if (valid(this.hash)) {
            uStr += this.hash;
        }
        return uStr;
    }
}

module.exports = CompatURL;
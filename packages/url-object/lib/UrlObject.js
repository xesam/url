const url = require('@xesam/url');
const UrlQuery = require('./UrlQuery');

class UrlObject {
    constructor(href) {
        this._components = {};
        this.query = new UrlQuery();;
        if (typeof href === 'string') {
            const url_components = url(href);
            this.protocol(url_components.protocol);
            this.auth(url_components.auth);
            this.host(url_components.host);
            this.pathname(url_components.pathname);
            this.search(url_components.search);
            this.hash(url_components.hash);
        }
    }

    _attr_(key, fn) {
        if (arguments.length <= 2) {
            return this._components[key];
        }
        let value = arguments[2];
        if (!value) {
            delete this._components[key];
            return this;
        }
        value = String(value).trim();
        if (fn) {
            value = fn(value);
        }
        if (!value) {
            delete this._components[key];
        } else {
            this._components[key] = value;
        }
        return this;
    }

    protocol() {
        return this._attr_.call(this, 'protocol', function (value) {
            value = value.replaceAll(/:|\//g, '');
            if (value.length) {
                return value + ':';
            } else {
                return null;
            }
        }, ...arguments);
    }

    auth(value) {
        if (!arguments.length) {
            if (this.username()) {
                if (this.password()) {
                    return `${this.username()}:${this.password()}`
                } else {
                    return this.username();
                }
            } else {
                if (this.password()) {
                    return `:${this.password()}`
                } else {
                    return undefined;
                }
            }
        }
        if (!value) {
            this.username(null);
            this.password(null);
            return this;
        }
        value = String(value).trim();
        const [username, password] = value.split(':');
        this.username(username);
        this.password(password);
        return this;
    }

    username() {
        return this._attr_.call(this, 'username', null, ...arguments);
    }

    password() {
        return this._attr_.call(this, 'password', null, ...arguments);
    }

    host(value) {
        if (!arguments.length) {
            if (this.hostname()) {
                if (this.port()) {
                    return `${this.hostname()}:${this.port()}`
                } else {
                    return this.hostname();
                }
            } else {
                if (this.port()) {
                    return `:${this.port()}`
                } else {
                    return undefined;
                }
            }
        }
        if (!value) {
            this.hostname(null);
            this.port(null);
            return this;
        }
        value = String(value).trim();
        const [hostname, port] = value.split(':');
        this.hostname(hostname);
        this.port(port);
        return this;
    }

    hostname() {
        return this._attr_.call(this, 'hostname', null, ...arguments);
    }

    port() {
        return this._attr_.call(this, 'port', null, ...arguments);
    }

    path(value) {
        if (!arguments.length) {
            if (this.pathname()) {
                if (this.search()) {
                    return `${this.pathname()}${this.search()}`
                } else {
                    return this.pathname();
                }
            } else {
                if (this.search()) {
                    return `${this.search()}`
                } else {
                    return undefined;
                }
            }
        }
        if (!value) {
            this.pathname(null);
            this.search(null);
            return this;
        }
        value = String(value);
        const hashStart = value.indexOf('#');
        if (hashStart !== -1) {
            value = value.substring(0, hashStart);
        }

        const searchStart = value.indexOf('?');
        if (searchStart !== -1) {
            const pathname = value.substring(0, searchStart);
            this.pathname(pathname);
            const search = value.substring(searchStart);
            this.search(search);
        } else {
            this.pathname(value);
            this.search(null);
        }
    }

    pathname() {
        return this._attr_.call(this, 'pathname', function (value) {
            if (!value.startsWith('/')) {
                value = '/' + value;
            }
            return value;
        }, ...arguments);
    }

    search(value) {
        if (!arguments.length) {
            if (!this.query || this.query.isEmpty()) {
                return;
            } else {
                return '?' + this.query.toUrlString();
            }
        }
        if (!value) {
            this.query.clear();
            return this;
        }
        value = String(value).trim();
        if (value === '?') {
            this.query.clear();
            return this;
        }
        this.query = new UrlQuery(value.substring(1));
        return this;
    }

    hash() {
        return this._attr_.call(this, 'hash', function (value) {
            if (!value.startsWith('#')) {
                value = '#' + value;
            }
            if (value === '#') {
                return null;
            } else {
                return value;
            }
        }, ...arguments);
    }

    toUrlString() {
        const segments = [];
        if (this.hash()) {
            segments.unshift(this.hash());
        }
        if (this.path()) {
            segments.unshift(this.path());
        }
        if (this.host()) {
            segments.unshift(this.host());
        }
        if (this.auth()) {
            segments.unshift('@');
            segments.unshift(this.auth());
        }
        if (this.host() || this.auth()) {
            segments.unshift('//');
        }
        if (this.protocol()) {
            segments.unshift(this.protocol());
        }
        return segments.join('');
    }

    toString() {
        return this.toUrlString();
    }
}

module.exports = UrlObject;
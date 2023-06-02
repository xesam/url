class UrlObject {
    constructor(href) {
        this._components = {};
    }

    _attr(name, value, defaultValue) {
        return this;
    }

    protocol(value) {
        if (!arguments.length) {
            return this._components['protocol'];
        }
        if (!value) {
            delete this._components['protocol'];
            return this;
        }
        value = String(value).trim();
        value = value.replaceAll(/:|\//g, '')
        this._components['protocol'] = value + ':';
        return this;
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

    username(value) {
        if (!arguments.length) {
            return this._components['username'];
        }
        if (!value) {
            delete this._components['username'];
            return this;
        }
        value = String(value).trim();
        this._components['username'] = value;
        return this;
    }

    password(value) {
        if (!arguments.length) {
            return this._components['password'];
        }
        if (!value) {
            delete this._components['password'];
            return this;
        }
        value = String(value).trim();
        this._components['password'] = value;
        return this;
    }

    host(value) {
        if (!arguments.length) {
            if (this.hostname()) {
                if (this.port()) {
                    return `${this.hostname()}:${this.port()}`
                } else {
                    return this.hostname();
                }
            }
            return undefined;
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

    hostname(value) {
        if (!arguments.length) {
            return this._components['hostname'];
        }
        if (!value) {
            delete this._components['hostname'];
            return this;
        }
        value = String(value).trim();
        this._components['hostname'] = value;
        return this;
    }

    port(value) {
        if (!arguments.length) {
            return this._components['port'];
        }
        if (!value) {
            delete this._components['port'];
            return this;
        }
        value = String(value).trim();
        this._components['port'] = value;
        return this;
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

    pathname(value) {
        if (!arguments.length) {
            return this._components['pathname'];
        }
        if (!value) {
            delete this._components['pathname'];
            return this;
        }
        value = String(value).trim();
        if (!value.startsWith('/')) {
            value = '/' + value;
        }
        this._components['pathname'] = value;
        return this;
    }

    search(value) {
        if (!arguments.length) {
            return this._components['search'];
        }
        if (!value) {
            delete this._components['search'];
            return this;
        }
        value = String(value).trim();
        if (value === '?') {
            delete this._components['search'];
            return this;
        }
        this._components['search'] = value;
        return this;
    }

    query(key, value) {

    }

    hash(value) {
        if (!arguments.length) {
            return this._components['hash'];
        }
        if (!value) {
            delete this._components['hash'];
            return this;
        }
        value = String(value).trim();
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        if (value === '#') {
            delete this._components['hash'];
            return this;
        }
        this._components['hash'] = value;
        return this;
    }

    from(href) {
        return this;
    }

    toString() {
        return `${this.protocol()}//${this.host()}${this.path()}${this.hash()}`;
    }

    toJSON() {
        return {};
    }
}

module.exports = UrlObject;
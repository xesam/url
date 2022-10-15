const REPLACER = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
};

function _replace(str) {
    return REPLACER[str];
}

function _encode(str) {
    return encodeURIComponent(str)
        .replace(/[!'\(\)~]|%20|%00/g, _replace);
}

function _decode(str) {
    return str
        .replace(/[ +]/g, '%20')
        .replace(/(%[a-f0-9]{2})+/ig, decodeURIComponent);
}

class CompatURLSearchParams {
    constructor(init) {
        this._params = Object.create({});
        if (init) {
            if (typeof init === 'string') {
                if (init.startsWith('?')) {
                    init = init.substring(1);
                }
                init.split('&')
                    .map(pair => {
                        const sepIndex = pair.indexOf('=');
                        if (sepIndex === -1) {
                            return [pair, ''];
                        } else {
                            return [pair.substring(0, sepIndex), pair.substring(sepIndex + 1)]
                        }
                    })
                    .forEach(([name, value]) => {
                        this.append(_decode(name), _decode(value));
                    });
            } else {
                console.error('不支持的 init 类型', init);
            }
        }
    }

    _ensure(name) {
        if (!(name in this._params)) {
            this._params[name] = [];
        }
    }

    append(name, value) {
        this._ensure(name);
        this._params[name].push(value);
    }

    delete(name) {
        if (name in this._params) {
            delete this._params[name]
        }
    }

    entries() {
        return Object.entries(this._params);
    }

    forEach(callback, thisArg) {
        throw Error('no implement');
    }

    get(name) {
        const values = this._params[name];
        if (values) {
            return values[0] || null;
        }
        return null;
    }

    getAll(name) {
        return this._params[name] || null;
    }

    has(name) {
        return name in this._params;
    }

    keys() {
        return Object.keys(this._params);
    }

    set(name, value) {
        this._ensure(name);
        this._params[name] = [value];
    }

    sort() {
        throw Error('no implement');
    }

    toString() {
        return Object.entries(this._params)
            .map(([name, values]) => {
                return values.map(value => {
                    return _encode(name) + '=' + _encode(value);
                }).join('&');
            }).join('&');
    }

    values() {
        return Object.values(this._params);
    }
}

module.exports = CompatURLSearchParams;
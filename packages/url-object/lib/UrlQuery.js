class UrlQuery {
    constructor(qstring, decodeValue = false) {
        this._components = Object.create(null);
        if (arguments.length) {
            this.merge(qstring, decodeValue);
        }
    }

    has(key) {
        return key in this._components;
    }

    get(key) {
        if (!this.has(key)) {
            return;
        }
        if (this._components[key].length > 1) {
            return this._components[key];
        } else {
            return this._components[key][0];
        }
    }

    add(key, value) {
        if (this.has(key)) {
            if (!this._components[key].includes(value)) {
                this._components[key].push(value);
            }
        } else {
            this.set(key, value);
        }
        return this;
    }

    set(key, ...values) {
        const validValues = values.filter(ele => !!ele);
        if (!validValues.length) {
            this._components[key] = [''];
        } else {
            this._components[key] = validValues;
        }

        return this;
    }

    remove(key) {
        delete this._components[key];
        return this;
    }

    clear() {
        this._components = Object.create(null);
        return this;
    }

    _loadFromQueryString(newQuery, decodeValue = false) {
        const empty = new UrlQuery();
        return newQuery.split('&')
            .map(ele => ele.split('='))
            .reduce((curr, [key, value]) => {
                curr.add(key, decodeValue ? decodeURIComponent(value) : value);
                return curr;
            }, empty);
    }

    merge(otherQuery, decodeValue = false) {
        if (typeof otherQuery === 'string') {
            const newUrlQuery = this._loadFromQueryString(otherQuery, decodeValue);
            this.merge(newUrlQuery);
        } else if (otherQuery.constructor === UrlQuery) {
            Object.assign(this._components, otherQuery._components);
        }
        return this;
    }

    toString(decodeValue = false) {
        return Object.entries(this._components)
            .map(([key, values]) => {
                return values.map(value => `${key}=${decodeValue ? encodeURIComponent(value) : value}`).join('&')
            })
            .join('&')
    }
}

module.exports = UrlQuery;
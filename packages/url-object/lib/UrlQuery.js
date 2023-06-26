class UrlQuery {
    constructor(qstring, decodeValue = false) {
        this._components = Object.create(null);
        if (qstring) {
            this.load(qstring, decodeValue);
        }
    }

    isEmpty() {
        return Object.keys(this._components).length === 0;
    }

    has(key) {
        return key in this._components;
    }

    getKeys() {
        return Object.keys(this._components);
    }

    getValue(key, index = 0) {
        if (!this.has(key)) {
            return;
        }
        return this._components[key][index];
    }

    getAllValues(key) {
        if (!this.has(key)) {
            return;
        }
        return this._components[key];
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

    load(newQuery, decodeValue = false) {
        this.clear();
        return newQuery.split('&')
            .map(ele => ele.split('='))
            .forEach(([key, value]) => {
                this.add(key, decodeValue ? decodeURIComponent(value) : value);
            });
    }

    merge(otherQuery, decodeValue = false) {
        if (typeof otherQuery === 'string') {
            const newUrlQuery = new UrlQuery(otherQuery, decodeValue);
            this.merge(newUrlQuery);
        } else if (otherQuery.constructor === UrlQuery) {
            Object.assign(this._components, otherQuery._components);
        }
        return this;
    }

    toUrlString(decodeValue = false) {
        return Object.entries(this._components)
            .map(([key, values]) => {
                return values.map(value => `${key}=${decodeValue ? encodeURIComponent(value) : value}`).join('&')
            })
            .join('&')
    }

    toString() {
        return this.toUrlString();
    }
}

module.exports = UrlQuery;
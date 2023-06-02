class UrlQuery {
    constructor(qstring, decode=false) {
        this._components = Object.create(null);
        if (arguments.length){
            this.merge(qstring, decode);
        }
    }

    has(key) {
        return key in this._components;
    }

    get(key) {
        if (!this.has(key)) {
            return;
        }
        if (this._components[key].length === 1) {
            return this._components[key][0];
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

    set(key) {
        this._components[key] = Array.prototype.slice.call(arguments, 1);
        return this;
    }

    clear(key, value) {
        if (this.has(key)) {
            if (arguments.length > 1) {
                const values = this.get(key);
                this.set(key, values.filter(ele => ele !== value));
            } else {
                this._components[key] = [];
            }
        }
        return this;
    }

    remove(key) {
        delete this._components[key];
        return this;
    }

    merge(newQuery, decode = false) {
        if (typeof newQuery === 'string') {
            const empty = new UrlQuery();
            const qObj = newQuery.split('&')
                .map(ele => ele.split('='))
                .reduce((curr, [key, value]) => {
                    curr.add(key, decode ? decodeURIComponent(value) : value);
                    return curr;
                }, empty);
            this.merge(qObj);
        } else if (newQuery.constructor === UrlQuery) {
            Object.assign(this._components, newQuery._components);
        }
        return this;
    }

    toString(decode = false) {
        return Object.entries(this._components)
            .map(([key, values]) => {
                return values.map(value => `${key}=${decode ? encodeURIComponent(value) : value}`).join('&')
            })
            .join('&')
    }
}

module.exports = UrlQuery;
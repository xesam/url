const { UrlQuery } = require('../lib/index');

describe('UrlQuery', () => {
    function createTestUrlQuery() {
        return new UrlQuery();
    }

    test('when create a new UrlQuery with nothing then all are empty', () => {
        const testUrlQuery = createTestUrlQuery();

        expect(testUrlQuery.isEmpty()).toBe(true);
        expect(testUrlQuery.toUrlString()).toBe('');
    });

    test('when create with qstring then add the keys with origin value', () => {
        const testUrlQuery = new UrlQuery('a=500%25&b=400&b=500');

        expect(testUrlQuery.get("a")).toEqual('500%25');
        expect(testUrlQuery.get("b")).toContain('400');
        expect(testUrlQuery.get("b")).toContain('500');
    });

    test('when create with qstring and enable decode then add the keys with decoded value', () => {
        const testUrlQuery = new UrlQuery('a=500%25&b=400&b=500', true);

        expect(testUrlQuery.get("a")).toEqual('500%');
        expect(testUrlQuery.get("b")).toContain('400');
        expect(testUrlQuery.get("b")).toContain('500');
    });

    test('when the key exit then true is returned', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("exist", 200);

        expect(testUrlQuery.has("exist")).toBe(true);
    });

    test('when the key does not exit then false is returned', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("exist", 200);

        expect(testUrlQuery.has("none-exist")).toBe(false);
    });

    test('when get by key then return the value of the key', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.set("exist", 200);

        expect(testUrlQuery.get("exist")).toBe(200);
    });

    test('when get by a non-exist key then return the undefined', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.set("exist", 200);

        expect(testUrlQuery.get("non-exist")).toBeUndefined();
    });

    test('when set falsy to a key then empty string is used', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.set("a", null);

        expect(testUrlQuery.get("a")).toBe('');
        expect(testUrlQuery.toUrlString()).toBe('a=');
    });

    test('when set a single value to a key then replace the origin value of the key', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.set("a", 200);
        testUrlQuery.set("a", 300);

        expect(testUrlQuery.get("a")).toBe(300);
    });

    test('when set multi values to a key then replace the origin value of the key', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.set("a", 200);
        testUrlQuery.set("a", 200, 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when add a value to a exist key then add the new value to the key', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);

        testUrlQuery.add("a", 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when add value to a none-exist key then create the key and add the new value to the key', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.add("a", 200);
        testUrlQuery.add("a", 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when add same value to the key then the last value is ignored', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.add("a", 200);
        testUrlQuery.add("a", 300);
        testUrlQuery.add("a", 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when remove a key then delete the key from UrlQuery', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);
        testUrlQuery.set("b", 300);

        testUrlQuery.remove("a");

        expect(testUrlQuery.has("a")).toBe(false);
        expect(testUrlQuery.has("b")).toBe(true);
    });

    test('when clear then delete all keys', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);
        testUrlQuery.set("b", 300);

        testUrlQuery.clear();

        expect(testUrlQuery.has("a")).toBe(false);
        expect(testUrlQuery.has("b")).toBe(false);
    });

    test('when merge with qstring then replace the matched keys', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [200, 300, 400]);

        testUrlQuery.merge('a=500%25&b=400');

        expect(testUrlQuery.get("a")).toEqual('500%25');
        expect(testUrlQuery.get("b")).toEqual('400');
    });

    test('when merge with qstring and decode is true then replace the matched keys with decoded value', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [200, 300, 400]);

        testUrlQuery.merge('a=500%25&b=400', true);

        expect(testUrlQuery.get("a")).toEqual('500%');
        expect(testUrlQuery.get("b")).toEqual('400');
    });

    test('when merge with another UrlQuery then replace the matched keys', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [300, 400]);
        testUrlQuery.set("c", 500);
        const anotherUrlQuery = new UrlQuery();
        anotherUrlQuery.add("a", 100);
        anotherUrlQuery.add("b", 200);

        testUrlQuery.merge(anotherUrlQuery);

        expect(testUrlQuery.get("a")).toEqual(100);
        expect(testUrlQuery.get("b")).toEqual(200);
        expect(testUrlQuery.get("c")).toEqual(500);
    });

    test('when toUrlString() then serialize the query object', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.add("a", '200%25');
        testUrlQuery.add("a", '300');
        testUrlQuery.add("a", '400');
        testUrlQuery.add("b", '400%25');

        const qstring = testUrlQuery.toUrlString();

        expect(qstring).toContain('a=200%25');
        expect(qstring).toContain('a=300');
        expect(qstring).toContain('a=400');
        expect(qstring).toContain('b=400%25');
    });

    test('when toUrlString(true) then serialize the query object and encode values', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.add("a", '200%25');
        testUrlQuery.add("a", '300');
        testUrlQuery.add("a", '400');
        testUrlQuery.add("b", '400%25');

        const qstring = testUrlQuery.toUrlString(true);

        expect(qstring).toContain('a=200%');
        expect(qstring).toContain('a=300');
        expect(qstring).toContain('a=400');
        expect(qstring).toContain('b=400%');
    });
});
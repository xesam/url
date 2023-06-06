const UrlQuery = require('../lib/UrlQuery');

describe('UrlObject', () => {
    function createTestUrlQuery() {
        return new UrlQuery();
    }

    test('when create a new UrlQuery then all are empty', () => {
        const testUrlQuery = createTestUrlQuery();

        expect(testUrlQuery.toString()).toBe('');
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

    test('when get with a key then return the value of the key', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("exist", 200);

        expect(testUrlQuery.get("exist")).toBe(200);
    });

    test('when set a key with a single value then replace the origin value', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);

        testUrlQuery.set("a", 300);
        expect(testUrlQuery.get("a")).toBe(300);
    });

    test('when set a key with multi values then replace the origin value', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);

        testUrlQuery.set("a", 200, 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when add value to a exist key then add the new value to the key', () => {
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

    test('when add same value to the key then ignore the new value ', () => {
        const testUrlQuery = createTestUrlQuery();

        testUrlQuery.add("a", 200);
        testUrlQuery.add("a", 300);
        testUrlQuery.add("a", 300);

        expect(testUrlQuery.get("a")).toEqual([200, 300]);
    });

    test('when clear a key then delete all the values of the key but keep the key', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", 200);

        testUrlQuery.clear("a");

        expect(testUrlQuery.has("a")).toBe(true);
        expect(testUrlQuery.get("a")).toBeUndefined();
    });

    test('when clear a exist key with target value then delete all matched-values from the key but keep the key', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [200, 300, 400]);

        testUrlQuery.clear("a", 200);

        expect(testUrlQuery.get("a")).toEqual([300, 400]);
    });

    test('when remove a key then delete the key from UrlQuery', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [200, 300, 400]);

        testUrlQuery.remove("a");

        expect(testUrlQuery.has("a")).toBe(false);
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
        const anotherUrlQuery = new UrlQuery();
        anotherUrlQuery.add("a", 100);
        anotherUrlQuery.add("b", 200);

        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.set("a", [300, 400]);
        testUrlQuery.set("c", 500);

        testUrlQuery.merge(anotherUrlQuery);

        expect(testUrlQuery.get("a")).toEqual(100);
        expect(testUrlQuery.get("b")).toEqual(200);
        expect(testUrlQuery.get("c")).toEqual(500);
    });

    test('when toString() then serialize the query object', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.add("a", '200%25');
        testUrlQuery.add("a", '300');
        testUrlQuery.add("a", '400');
        testUrlQuery.add("b", '400%25');

        const qstring = testUrlQuery.toString();

        expect(qstring).toContain('a=200%25');
        expect(qstring).toContain('a=300');
        expect(qstring).toContain('a=400');
        expect(qstring).toContain('b=400%25');
    });

    test('when toString(true) then serialize the query object and encode values', () => {
        const testUrlQuery = createTestUrlQuery();
        testUrlQuery.add("a", '200%25');
        testUrlQuery.add("a", '300');
        testUrlQuery.add("a", '400');
        testUrlQuery.add("b", '400%25');

        const qstring = testUrlQuery.toString(true);

        expect(qstring).toContain('a=200%');
        expect(qstring).toContain('a=300');
        expect(qstring).toContain('a=400');
        expect(qstring).toContain('b=400%');
    });

    test('when create with qstring then add the keys with origin value', () => {
        const testUrlQuery = new UrlQuery('a=500%25&b=400');

        expect(testUrlQuery.get("a")).toEqual('500%25');
        expect(testUrlQuery.get("b")).toEqual('400');
    });

    test('when create with qstring and decode is true then add the keys with decoded value', () => {
        const testUrlQuery = new UrlQuery('a=500%25&b=400', true);

        expect(testUrlQuery.get("a")).toEqual('500%');
        expect(testUrlQuery.get("b")).toEqual('400');
    });
});
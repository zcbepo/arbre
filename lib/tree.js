'use strict';

class Tree {
    constructor(raw) {
        this._raw = raw;
    }
    get data() {
        return this._raw;
    }
    static from(arr) {
        const map = new Map(), root = [];
        arr.forEach(item => {
            map.set(item.id, Object.assign(Object.assign({}, item), { children: [] }));
        });
        arr.forEach(item => {
            if (item.pid == -1) {
                root.push(map.get(item.id));
            }
            else {
                const parent = map.get(item.pid);
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(map.get(item.id));
            }
        });
        return new Tree(root);
    }
    flat() {
        const res = [];
        this.forEach(item => {
            res.push(item);
        });
        return res;
    }
    forEach(callbackFn, data = this._raw) {
        data.forEach(item => {
            var _a;
            callbackFn(item);
            if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
                this.forEach(callbackFn, item.children);
            }
        });
    }
    map(callbackFn, data = this._raw) {
        return data.map(item => {
            const res = callbackFn(Object.assign({}, item));
            if (item.children) {
                res.children = this.map(callbackFn, item.children);
            }
            return res;
        });
    }
    filter(callbackFn, data = this._raw) {
        var _a;
        const ret = [];
        for (let i = 0; i < data.length; i++) {
            const element = Object.assign({}, data[i]);
            const filterResult = callbackFn(element);
            if (element.children) {
                element.children = this.filter(callbackFn, element.children);
            }
            if (filterResult || ((_a = element.children) === null || _a === void 0 ? void 0 : _a.length)) {
                ret.push(element);
            }
        }
        return ret;
    }
    find(callbackFn, data = this._raw) {
        for (let i = 0; i < data.length; i++) {
            const element = Object.assign({}, data[i]);
            const filterResult = callbackFn(element);
            if (filterResult) {
                return element;
            }
            if (element.children) {
                element.children = this.filter(callbackFn, element.children);
            }
        }
        return null;
    }
}

module.exports = Tree;

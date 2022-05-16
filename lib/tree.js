'use strict';

const warn = console.warn;
function isStringOrNumber(input) {
    return typeof input === 'number' || typeof input === 'string';
}
function isTreeNode(node) {
    if (!isStringOrNumber(node.id)) {
        warn(`node id should be string or number, got ${typeof node.id}`);
        return false;
    }
    if (!isStringOrNumber(node.pid)) {
        warn(`node pid should be string or number, got ${typeof node.pid}`);
        return false;
    }
    return true;
}
function getPosition(parentIndex, index) {
    return parentIndex ? [parentIndex, index].join('-') : `${index}`;
}
function forEachFn(callback, data, position = '') {
    data.forEach((item, index) => {
        var _a;
        const pos = getPosition(position, index);
        callback(item, pos);
        if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
            forEachFn(callback, item.children, pos);
        }
    });
}
function mapFn(callback, data, position = '') {
    return data.map((item, index) => {
        const pos = getPosition(position, index);
        const res = callback(Object.assign({}, item), pos);
        if (item.children) {
            res.children = mapFn(callback, item.children, pos);
        }
        return res;
    });
}
function filterFn(callback, data, position = '') {
    var _a;
    const ret = [];
    for (let i = 0; i < data.length; i++) {
        const element = Object.assign({}, data[i]);
        const pos = getPosition(position, i);
        const filterResult = callback(element, pos);
        if (element.children) {
            element.children = filterFn(callback, element.children, pos);
        }
        if (filterResult || ((_a = element.children) === null || _a === void 0 ? void 0 : _a.length)) {
            ret.push(element);
        }
    }
    return ret;
}
function findFn(callback, data, position = '') {
    for (let i = 0; i < data.length; i++) {
        const element = Object.assign({}, data[i]);
        const pos = getPosition(position, i);
        const filterResult = callback(element, pos);
        if (filterResult) {
            return element;
        }
        if (element.children) {
            element.children = filterFn(callback, element.children, pos);
        }
    }
    return null;
}

class Arbre {
    constructor(raw) {
        this._raw = raw;
        this._markPosition();
    }
    get data() {
        return this._raw;
    }
    _markPosition() {
        this.forEach((element, pos) => {
            element.pos = pos;
        });
    }
    /**
     * Convert Array to Tree
     * @param arr
     * @returns
     */
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
        return new Arbre(root);
    }
    /**
     * return T at the position
     * @param position
     * @returns
     */
    at(position) {
        const positionArr = position.split('-').map(p => parseInt(p));
        try {
            let ret = this._raw[positionArr.shift()];
            positionArr.forEach(pos => {
                var _a;
                ret = (_a = ret.children) === null || _a === void 0 ? void 0 : _a[pos];
            });
            if (!ret) {
                throw Error();
            }
            return ret;
        }
        catch (_a) {
            console.warn(`cannot find tree node on position: ${position} in this tree`);
            return null;
        }
    }
    push(node) {
        if (!isTreeNode(node))
            return;
        let arr;
        if (node.pid === -1) {
            arr = this._raw;
        }
        else {
            const parent = this.find(n => n.id === node.pid);
            if (!parent) {
                console.warn('parent not found in the tree, please check node.pid');
                return;
            }
            arr = parent.children;
        }
        arr.push(node);
    }
    /**
     * Convert Tree to Array
     * @returns result
     */
    flat() {
        const res = [];
        this.forEach(item => {
            res.push(item);
        });
        return res;
    }
    /**
     * @param callbackFn
     * @param data
     */
    forEach(callbackFn) {
        forEachFn(callbackFn, this._raw);
    }
    map(callbackFn) {
        return mapFn(callbackFn, this._raw);
    }
    filter(callbackFn) {
        return filterFn(callbackFn, this._raw);
    }
    find(callbackFn) {
        return findFn(callbackFn, this._raw);
    }
}

module.exports = Arbre;

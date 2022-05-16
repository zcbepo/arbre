import { CallbackFn, StringOrNumber, TreeNode } from "./index"

const warn = console.warn

function isStringOrNumber(input: any) {
    return typeof input === 'number' || typeof input === 'string'
}

export function isTreeNode(node: any) {
    if (!isStringOrNumber(node.id)) {
        warn(`node id should be string or number, got ${typeof node.id}`)
        return false
    }
    if (!isStringOrNumber(node.pid)) {
        warn(`node pid should be string or number, got ${typeof node.pid}`)
        return false
    }
    return true
}

function getPosition(parentIndex: StringOrNumber, index: StringOrNumber) {
    return parentIndex ? [parentIndex, index].join('-') : `${index}`;
}

export function forEachFn<T extends TreeNode>(callback: CallbackFn<void, T>, data: T[], position = '') {
    data.forEach((item, index) => {
        const pos = getPosition(position, index);
        callback(item, pos);
        if (item.children?.length) {
            forEachFn(callback, item.children as T[], pos);
        }
    })
}

export function mapFn<T extends TreeNode>(callback: CallbackFn<any, T>, data: T[], position = '') {
    return data.map((item, index) => {
        const pos = getPosition(position, index);
        const res = callback({...item}, pos)
        if (item.children) {
            res.children = mapFn(callback, item.children as T[], pos)
        }
        return res
    })
}

export function filterFn<T extends TreeNode>(callback: CallbackFn<boolean, T>, data: T[], position = '') {
    const ret = []
    for (let i = 0; i < data.length; i++) {
        const element = {...data[i]};
        const pos = getPosition(position, i)
        const filterResult = callback(element, pos)
        if (element.children) {
            element.children = filterFn(callback, element.children as T[], pos)
        }
        if (filterResult || element.children?.length) {
            ret.push(element)
        }
    }
    return ret
}

export function findFn<T extends TreeNode>(callback: CallbackFn<boolean, T>, data: T[], position = '') {
    for (let i = 0; i < data.length; i++) {
        const element = {...data[i]};
        const pos = getPosition(position, i)
        const filterResult = callback(element, pos)
        if (filterResult) {
            return element
        }
        if (element.children) {
            element.children = filterFn(callback, element.children as T[], pos)
        }
    }
    return null
}
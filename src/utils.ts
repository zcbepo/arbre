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

export function forEachFn(callback: CallbackFn<void>, data: TreeNode[], position = '') {
    data.forEach((item, index) => {
        const pos = getPosition(position, index);
        callback(item, pos);
        if (item.children?.length) {
            forEachFn(callback, item.children, pos);
        }
    })
}

export function mapFn(callback: CallbackFn<any>, data: TreeNode[], position = '') {
    return data.map((item, index) => {
        const pos = getPosition(position, index);
        const res = callback({...item}, pos)
        if (item.children) {
            res.children = mapFn(callback, item.children, pos)
        }
        return res
    })
}

export function filterFn(callback: CallbackFn<boolean>, data: TreeNode[], position = '') {
    const ret = []
    for (let i = 0; i < data.length; i++) {
        const element = {...data[i]};
        const pos = getPosition(position, i)
        const filterResult = callback(element, pos)
        if (element.children) {
            element.children = filterFn(callback, element.children, pos)
        }
        if (filterResult || element.children?.length) {
            ret.push(element)
        }
    }
    return ret
}

export function findFn(callback: CallbackFn<boolean>, data: TreeNode[], position = '') {
    for (let i = 0; i < data.length; i++) {
        const element = {...data[i]};
        const pos = getPosition(position, i)
        const filterResult = callback(element, pos)
        if (filterResult) {
            return element
        }
        if (element.children) {
            element.children = filterFn(callback, element.children, pos)
        }
    }
    return null
}
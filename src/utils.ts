const warn = console.warn

function isStringOrNumber(input: any) {
    return typeof input === 'number' || typeof input === 'string'
}

export function isTreeNode(node: any) {
    if (!isStringOrNumber(node.id)) {
        warn('node id should be string or number')
        return false
    }
    if (!isStringOrNumber(node.pid)) {
        warn('node pid should be string or number')
        return false
    }
    return true
}
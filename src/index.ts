import { filterFn, findFn, forEachFn, isTreeNode, mapFn } from "./utils"

export type StringOrNumber = string | number

export interface TreeArrayItem {
    id: StringOrNumber
    pid: StringOrNumber
    [key: string]: any
}

export interface TreeNode extends TreeArrayItem {
    children?: TreeNode[]
}

/**
 * tree iterator callback function, pass TreeNode
 * @param pos position of treeNode, e.g. 1-2-1
 */
export type CallbackFn<T> = (element: TreeNode, pos: string) => T


export default class Arbre {
    private _raw: TreeNode[]

    constructor(raw: TreeNode[]) {
        this._raw = raw
        this._markPosition()
    }

    get data() {
        return this._raw
    }

    private _markPosition() {
        this.forEach((element, pos) => {
            element.pos = pos
        })
    }

    /**
     * Convert Array to Tree
     * @param arr 
     * @returns 
     */
    static from(arr: TreeArrayItem[]) {
        const map = new Map<StringOrNumber, TreeNode>(), root: TreeNode[] = []
        arr.forEach(item => {
            map.set(item.id, {...item, children: []})
        })
        arr.forEach(item => {
            if (item.pid == -1) {
                root.push(map.get(item.id) as TreeNode)
            } else {
                const parent = map.get(item.pid) as TreeNode
                if (!parent.children) {
                    parent.children = []
                }
                parent.children.push(map.get(item.id) as TreeNode)
            }
        })
        return new Arbre(root)
    }

    /**
     * return treeNode at the position
     * @param position 
     * @returns 
     */
    at(position: string) {
        const positionArr = position.split('-').map(p => parseInt(p))
        try {
            let ret = this._raw[positionArr.shift() as number];
            positionArr.forEach(pos => {
                ret = ret.children?.[pos] as TreeNode
            })
            if (!ret) {
                throw Error()
            }
            return ret
        } catch {
            console.warn(`cannot find tree node on position: ${position} in this tree`);
            return null
        }
    }

    push(node: TreeNode) {
        if (!isTreeNode(node)) return
        let arr;
        if (node.pid === -1) {
            arr = this._raw
        } else {
            const parent = this.find(n => n.id === node.pid)
            if (!parent) {
                console.warn('parent not found in the tree, please check node.pid')
                return
            }
            arr = parent.children as []
        }
        arr.push(node)
    }

    /**
     * Convert Tree to Array
     * @returns result
     */
    flat() {
        const res: TreeNode[] = []
        this.forEach(item => {
            res.push(item)
        })
        return res
    }

    /**
     * @param callbackFn 
     * @param data 
     */
    forEach(callbackFn: CallbackFn<void>) {
        forEachFn(callbackFn, this._raw)
    }

    map(callbackFn: CallbackFn<any>) {
        return mapFn(callbackFn, this._raw)
    }

    filter(callbackFn: CallbackFn<boolean>) {
        return filterFn(callbackFn, this._raw)
    }

    find(callbackFn: CallbackFn<boolean>): TreeNode | null {
        return findFn(callbackFn, this._raw);
    }
}
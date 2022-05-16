import { filterFn, findFn, forEachFn, isTreeNode, mapFn } from "./utils"

export type StringOrNumber = string | number

export interface TreeArrayItem {
    id: StringOrNumber
    pid: StringOrNumber
    [key: string]: any
}

export interface TreeNode extends TreeArrayItem {
    children?: TreeNode[]
    pos?: string
}

/**
 * tree iterator callback function, pass TreeNode
 * @param pos position of treeNode, e.g. 1-2-1
 */
export type CallbackFn<T, T2 extends TreeNode> = (element: T2, pos: string) => T


export default class Arbre<T extends TreeNode> {
    private _raw: T[]

    constructor(raw: T[]) {
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
    static from<T extends TreeArrayItem>(arr: T[]) {
        const map = new Map<StringOrNumber, T>(), root: T[] = []
        arr.forEach(item => {
            map.set(item.id, {...item, children: []})
        })
        arr.forEach(item => {
            if (item.pid == -1) {
                root.push(map.get(item.id) as T)
            } else {
                const parent = map.get(item.pid) as any
                if (!parent.children) {
                    parent.children = []
                }
                parent.children.push(map.get(item.id) as T)
            }
        })
        return new Arbre(root)
    }

    /**
     * return T at the position
     * @param position 
     * @returns 
     */
    at(position: string) {
        const positionArr = position.split('-').map(p => parseInt(p))
        try {
            let ret = this._raw[positionArr.shift() as number];
            positionArr.forEach(pos => {
                ret = ret.children?.[pos] as T
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

    push(node: T) {
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
        const res: T[] = []
        this.forEach(item => {
            res.push(item)
        })
        return res
    }

    /**
     * @param callbackFn 
     * @param data 
     */
    forEach(callbackFn: CallbackFn<void, T>) {
        forEachFn(callbackFn, this._raw)
    }

    map(callbackFn: CallbackFn<any, T>) {
        return mapFn(callbackFn, this._raw)
    }

    filter(callbackFn: CallbackFn<boolean, T>) {
        return filterFn(callbackFn, this._raw)
    }

    find(callbackFn: CallbackFn<boolean, T>): T | null {
        return findFn(callbackFn, this._raw);
    }
}
type StringOrNumber = string | number

interface TreeArrayItem {
    id: StringOrNumber
    pid: StringOrNumber
    [key: string]: any
}

interface TreeNode extends TreeArrayItem {
    children?: TreeNode[]
}

type CallbackFn<T> = (element: TreeNode) => T


export default class Tree {
    private _raw: TreeNode[]

    constructor(raw: TreeNode[]) {
        this._raw = raw
    }

    get data() {
        return this._raw
    }

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
        return new Tree(root)
    }

    flat() {
        const res: TreeNode[] = []
        this.forEach(item => {
            res.push(item)
        })
        return res
    }

    forEach(callbackFn: CallbackFn<void>, data = this._raw) {
        data.forEach(item => {
            callbackFn(item)
            if (item.children?.length) {
                this.forEach(callbackFn, item.children)
            }
        })
    }

    map(callbackFn: CallbackFn<any>, data = this._raw) {
        return data.map(item => {
            const res = callbackFn({...item})
            if (item.children) {
                res.children = this.map(callbackFn, item.children)
            }
            return res
        })
    }

    filter(callbackFn: CallbackFn<boolean>, data = this._raw) {
        const ret = []
        for (let i = 0; i < data.length; i++) {
            const element = {...data[i]};
            const filterResult = callbackFn(element)
            if (element.children) {
                element.children = this.filter(callbackFn, element.children)
            }
            if (filterResult || element.children?.length) {
                ret.push(element)
            }
        }
        return ret
    }

    find(callbackFn: CallbackFn<boolean>, data = this._raw) {
        for (let i = 0; i < data.length; i++) {
            const element = {...data[i]};
            const filterResult = callbackFn(element)
            if (filterResult) {
                return element
            }
            if (element.children) {
                element.children = this.filter(callbackFn, element.children)
            }
        }
        return null
    }
}
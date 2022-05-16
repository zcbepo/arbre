export declare type StringOrNumber = string | number;
export interface TreeArrayItem {
    id: StringOrNumber;
    pid: StringOrNumber;
    [key: string]: any;
}
export interface TreeNode extends TreeArrayItem {
    children?: TreeNode[];
}
/**
 * tree iterator callback function, pass TreeNode
 * @param pos position of treeNode, e.g. 1-2-1
 */
export declare type CallbackFn<T> = (element: TreeNode, pos: string) => T;
export default class Arbre {
    private _raw;
    constructor(raw: TreeNode[]);
    get data(): TreeNode[];
    private _markPosition;
    /**
     * Convert Array to Tree
     * @param arr
     * @returns
     */
    static from(arr: TreeArrayItem[]): Arbre;
    /**
     * return treeNode at the position
     * @param position
     * @returns
     */
    at(position: string): TreeNode | null;
    push(node: TreeNode): void;
    /**
     * Convert Tree to Array
     * @returns result
     */
    flat(): TreeNode[];
    /**
     * @param callbackFn
     * @param data
     */
    forEach(callbackFn: CallbackFn<void>): void;
    map(callbackFn: CallbackFn<any>): any[];
    filter(callbackFn: CallbackFn<boolean>): {
        [x: string]: any;
        children?: TreeNode[] | undefined;
        id: StringOrNumber;
        pid: StringOrNumber;
    }[];
    find(callbackFn: CallbackFn<boolean>): TreeNode | null;
}

export declare type StringOrNumber = string | number;
export interface TreeArrayItem {
    id: StringOrNumber;
    pid: StringOrNumber;
    [key: string]: any;
}
export interface TreeNode extends TreeArrayItem {
    children?: TreeNode[];
    pos?: string;
}
/**
 * tree iterator callback function, pass TreeNode
 * @param pos position of treeNode, e.g. 1-2-1
 */
export declare type CallbackFn<T, T2 extends TreeNode> = (element: T2, pos: string) => T;
export default class Arbre<T extends TreeNode> {
    private _raw;
    constructor(raw: T[]);
    get data(): T[];
    private _markPosition;
    /**
     * Convert Array to Tree
     * @param arr
     * @returns
     */
    static from<T extends TreeArrayItem>(arr: T[]): Arbre<T>;
    /**
     * return T at the position
     * @param position
     * @returns
     */
    at(position: string): T | null;
    push(node: T): void;
    /**
     * Convert Tree to Array
     * @returns result
     */
    flat(): T[];
    /**
     * @param callbackFn
     * @param data
     */
    forEach(callbackFn: CallbackFn<void, T>): void;
    map(callbackFn: CallbackFn<any, T>): any[];
    filter(callbackFn: CallbackFn<boolean, T>): T[];
    find(callbackFn: CallbackFn<boolean, T>): T | null;
}

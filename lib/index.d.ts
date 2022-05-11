declare type StringOrNumber = string | number;
interface TreeArrayItem {
    id: StringOrNumber;
    pid: StringOrNumber;
    [key: string]: any;
}
interface TreeNode extends TreeArrayItem {
    children?: TreeNode[];
}
declare type CallbackFn<T> = (element: TreeNode) => T;
export default class Arbre {
    private _raw;
    constructor(raw: TreeNode[]);
    get data(): TreeNode[];
    static from(arr: TreeArrayItem[]): Arbre;
    flat(): TreeNode[];
    forEach(callbackFn: CallbackFn<void>, data?: TreeNode[]): void;
    map(callbackFn: CallbackFn<any>, data?: TreeNode[]): any[];
    filter(callbackFn: CallbackFn<boolean>, data?: TreeNode[]): {
        [x: string]: any;
        children?: TreeNode[] | undefined;
        id: StringOrNumber;
        pid: StringOrNumber;
    }[];
    find(callbackFn: CallbackFn<boolean>, data?: TreeNode[]): {
        [x: string]: any;
        children?: TreeNode[] | undefined;
        id: StringOrNumber;
        pid: StringOrNumber;
    } | null;
}
export {};

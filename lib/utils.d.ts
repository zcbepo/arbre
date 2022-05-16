import { CallbackFn, StringOrNumber, TreeNode } from "./index";
export declare function isTreeNode(node: any): boolean;
export declare function forEachFn(callback: CallbackFn<void>, data: TreeNode[], position?: string): void;
export declare function mapFn(callback: CallbackFn<any>, data: TreeNode[], position?: string): any[];
export declare function filterFn(callback: CallbackFn<boolean>, data: TreeNode[], position?: string): {
    [x: string]: any;
    children?: TreeNode[] | undefined;
    id: StringOrNumber;
    pid: StringOrNumber;
}[];
export declare function findFn(callback: CallbackFn<boolean>, data: TreeNode[], position?: string): {
    [x: string]: any;
    children?: TreeNode[] | undefined;
    id: StringOrNumber;
    pid: StringOrNumber;
} | null;

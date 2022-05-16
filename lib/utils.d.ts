import { CallbackFn, TreeNode } from "./index";
export declare function isTreeNode(node: any): boolean;
export declare function forEachFn<T extends TreeNode>(callback: CallbackFn<void, T>, data: T[], position?: string): void;
export declare function mapFn<T extends TreeNode>(callback: CallbackFn<any, T>, data: T[], position?: string): any[];
export declare function filterFn<T extends TreeNode>(callback: CallbackFn<boolean, T>, data: T[], position?: string): T[];
export declare function findFn<T extends TreeNode>(callback: CallbackFn<boolean, T>, data: T[], position?: string): T | null;

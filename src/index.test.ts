import ArbreTree, { TreeNode } from "./index";

const testTreeData: TreeNode[] = [
    {id: 1, pid: -1},
    {id: 2, pid: 1}
]

const testTree = ArbreTree.from(testTreeData)

test('test result', () => {
    
})
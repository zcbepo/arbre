import ArbreTree, { TreeNode } from "./index";

interface FileTreeNode extends TreeNode {
    name: string
}

const testTreeData: FileTreeNode[] = [
    {id: 1, pid: -1, name: 'folder1'},
    {id: 2, pid: 1, name: 'file1.png'}
]

const testTree = ArbreTree.from(testTreeData)

test('test markPosition', () => {
    expect(testTree.at('0')?.pos).toBe('0')
})

test('test foreach', () => {
    testTree.forEach(item => item.bar = 'bar')
    expect(testTree.data[0].bar).toBe('bar')
})

test('test filter', () => {
    const result = testTree.filter(item => item.id > 0)
    const newTree = new ArbreTree(result)
    expect(newTree.flat().length).toBe(2)
})

test('test map', () => {
    const result = testTree.map(item => ({...item, foo: Math.random()}))
    expect(typeof result[0].foo).toBe('number')
})

test('test find', () => {
    const result = testTree.find(item => item.id == 1)
    expect(result?.id).toBe(1)
})

test('test push', () => {
    testTree.push({id: 3, pid: 1, name: "file2.jpg"})
    expect(testTree.data[0].children?.length).toBe(2)
})

test('test at', () => {
    const node = testTree.at('0-1')
    expect(node?.id).toBe(3)
})

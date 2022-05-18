Tree Structure library that provide Apis like Array.

## Installing
Using npm:
```bash
npm install arbre-tree
```

Using yarn:
```bash
yarn add arbre-tree
```

## Example
```javascript
import ArbreTree from 'arbre-tree'

const treeData = [
    {
        id: 1,
        pid: -1,
        children: [
            {
                id: 2,
                pid: 1
            }
        ]
    }
]

const tree = new ArbreTree(treeData)

const treeArray = [
    { id: 1, pid: -1 },
    { id: 2, pid: 1 }
]

const treeFromArray = ArbreTree.from(treeArray)

tree.forEach((node) => {})

tree.forEach((node) => node.id)

tree.filter((node) => node.id > 0)

tree.find((node) => node.id === 1)

tree.at('0-0')
```

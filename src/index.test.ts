import Tree from "./index";

function genRawData(length = 50) {
    const pids = [-1, 1, 2, 3, 4, 5, 6]
    const res = []
    while (length--) {
        res.push({
            id: length,
            pid: pids[random(length)],
        })
    }
    if (!res.some(item => item.id === -1)) {
        res[0].id = -1
    }
    return res
}

function random(exist: number, max = 6): number {
    const res = Math.floor(Math.random() * max)
    if (res === exist) {
        return random(exist, max)
    }
    return res
}

const data = genRawData()

const testTree = Tree.from(data);

test('test result', () => {
    testTree.forEach(item => console.log(item))
    expect(1+1).toBe(2)
})
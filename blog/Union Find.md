# Union Find

适用问题：

1. 图的连通性问题
1. 最小生成树问题

模版
```javascript
class UnionFindSet {
    constructor(size) {
        this.parents = Array(size).fill().map((_, i) => i)
        this.ranks = Array(size).fill(0)
    }

    find(x) {
        if (this.parents[x] !== x) this.parents[x] = this.find(this.parents[x])
        return this.parents[x]
    }

    union(x, y) {
        const rx = this.find(x)
        const ry = this.find(y)
        if (this.ranks[rx] < this.ranks[ry]) {
            this.parents[rx] = ry
        } else {
            this.parents[ry] = rx
            this.ranks[ry] += this.ranks[rx] === this.ranks[ry] ? 1 : 0
        }
    }
}
```
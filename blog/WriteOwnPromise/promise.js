class Promise {
    state = 'unfulfilled'
    handles = []

    constructor(fn) {
        try {
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
        
    }

    resolve = (params) => {
        if (this.state === 'completed') return
        this.state = 'completed'
        while (this.handles.length) {
            try {
                const handle = this.handles.shift()
                if (handle.resolve) params = handle.resolve(params)
            } catch (error) {
                this.reject(error, true)
                break
            }
        }
    }

    reject = (error, isCatch = false) => {
        if (!isCatch) {
            if (this.state === 'completed') return
            this.state = 'completed'
        }
        
        while (this.handles.length) {
            const handle = this.handles.shift()
            if (handle.reject) handle.reject(error)
        }
    }

    then(resolve, reject) {
        const handle = {}

        if (typeof resolve === 'function') handle.resolve = resolve
        if (typeof reject === 'function') handle.reject = reject

        this.handles.push(handle)

        return this
    }

    static all(tasks) {
        return new Promise((resolve, reject) => {
            const results = []
            let count = 0
            for (let i=0; i<tasks.length; i++) {
                tasks[i].then((result) => {
                    results[i] = result
                    console.log(i)
                    if (++count === tasks.length) {
                        resolve(results)
                    }
                }, reject)
            }
        })
    }

    static race(tasks) {
        return new Promise((resolve, reject) => {
            for (let i=0; i<tasks.length; i++) {
                tasks[i].then(resolve, reject)
            }
        })
    }
}

// new Promise((resolve, reject) => {
//     console.log('Do something')
//     setTimeout(function() {
//         resolve(1000)
//     }, 1000)
// }).then((time) => {
//     console.log('After', time)
//     const error = new Error('Error after one second')
//     throw error
// }, (error) => {
//     console.error(error)
// }).then((result) => {
//     console.log(result)
// }, (error) => {
//     console.log(5555555)
//     console.error(error)
// })

// Promise.all([
//     new Promise((r) => { setTimeout(r, 4000) }),
//     new Promise((r) => { setTimeout(r, 2000) })
// ]).then(() => {
//     console.log(1000)
// })

Promise.race([
    new Promise((r) => { setTimeout(r, 4000) }),
    new Promise((r) => { setTimeout(r, 2000) })
]).then(() => {
    console.log(1000)
})
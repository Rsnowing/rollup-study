// 重写数组的push, shift, unshift, pop, reverse, sort, splice 方法 => 会导致数组本身发生变化的方法
let oldArrayMethods = Array.prototype
const methods = [
    'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'
]
export const arrayMethods = Object.create(oldArrayMethods) 
methods.forEach(method => {
    arrayMethods[method] = function(...args) {
        console.log(...args, '调用')
        const res = oldArrayMethods[method].apply(this, args) // 调用原生的数组方法
        let inserted
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
            default:
                break;
        }
        if (inserted) {
            ob.observerArray(inserted)
        }
        return res
    }
})
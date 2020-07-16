import { isObject, def } from '../util/index'
import { arrayMethods } from './array.js'
class Observe {
    constructor (value) {
        // 给每一个监控过的对象加一个ob属性[不可枚举]
            def(value, '__ob__', this)
            if (Array.isArray(value)) {
                value.__proto__ = arrayMethods
                this.observerArray(value)
            } else {
                this.walk(value)
            }
        }

        observerArray(value) {
            value.forEach(item => {
                observe(item)
            })
        }

        walk(data) {
            let keys = Object.keys(data)
            keys.forEach(item => {
                defineReactive(data, item, data[item]) // 定义响应式数据
            })  
        }
}

function defineReactive(data, key, value) {
    observe(value) // 递归实现深度检测
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observe(newValue) // 劫持用户设置的值
            console.log('值发生变化')
            value = newValue
        }
    })
}

export function observe(data) {
    if (!isObject(data)) {
        return;
    }
    return new Observe(data)
}
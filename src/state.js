import { observe } from './observe/index'
export function initState(vm) {
    const opts = vm.$options
    console.log(opts)
    if (opts.props) {
        initProps(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
}

function initProps(vm) {

}

function initData(vm) {
    // data 初始化
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    // 对象劫持 =》 用户改变数据 希望得到通知 =》 刷新页面 ===》 数据变化驱动页面变化
    // Object.defineProperty() 重写对象set get方法 无法兼容ie8 及以下
    observe(data)
}

function initComputed(vm) {

}

function initWatch(vm) {

}

function initMethods(vm) {

}
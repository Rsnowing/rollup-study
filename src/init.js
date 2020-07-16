import { initState } from './state'
import { compileToFunction } from './compiler/index.js'
export function initMinxin(Vue) {
    // 初始化
    Vue.prototype._init = function(options) {
        // 数据劫持
        const vm = this;
        vm.$options = options
        // 初始化状态
        initState(vm)
        // 用户传入el则开始挂载流程
        if(vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el) {
        const vm = this
        const opts = vm.$options
        el = document.querySelector(el)
        // render => template => el
        if(!opts.render) {
            // 对模板编译
            let template = opts.template
            if(!template && el) {
                template = el.outerHTML
            }
            const render = compileToFunction(template)
            console.log(template)
        }
    }
}

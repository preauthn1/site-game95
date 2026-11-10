import Vue from 'vue'
import loading from './loading.vue'

const $app = Vue.extend(loading)

const $loading = new $app().$mount(document.createElement('div'))

document.body.appendChild($loading.$el)

export default {
    install(vm) {
        vm.prototype.$loading = {
            show: (params) => {
                // Object.keys(params).forEach(key => {
                //     $loading[key] = params[key]
                // })
                $loading.visable = true
            },
            hide: () => {
                $loading.visable = false
            }
        }
    }
}
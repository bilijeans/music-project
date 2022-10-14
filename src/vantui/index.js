import { Circle } from 'vant'

const UIComponents = [Circle]

const VantUIPlugin = {}

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default VantUIPlugin
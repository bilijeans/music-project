import { Circle, Progress, Swipe, SwipeItem } from 'vant'

const UIComponents = [Circle, Progress, Swipe, SwipeItem]

const VantUIPlugin = {}

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default VantUIPlugin
import { Circle, Progress, Swipe, SwipeItem, List } from 'vant'

const UIComponents = [Circle, Progress, Swipe, SwipeItem, List]

const VantUIPlugin = {}

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default VantUIPlugin
import { Circle, Progress, Swipe, SwipeItem, List, Skeleton, Lazyload } from 'vant'

const UIComponents = [Circle, Progress, Swipe, SwipeItem, List, Skeleton, Lazyload]

const VantUIPlugin = {}

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default VantUIPlugin
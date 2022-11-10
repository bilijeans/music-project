import { Icon, Tab, Tabs, Popup, Progress, Swipe, SwipeItem } from 'wot-design'

const UIComponents = [Icon, Tab, Tabs, Popup, Progress, Swipe, SwipeItem]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin
import { Icon, Tab, Tabs, Popup, Progress } from 'wot-design'

const UIComponents = [Icon, Tab, Tabs, Popup, Progress]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin
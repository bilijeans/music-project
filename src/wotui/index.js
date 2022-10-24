import { Icon, Tab, Tabs, Popup } from 'wot-design'

const UIComponents = [Icon, Tab, Tabs, Popup]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin
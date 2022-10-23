import { Icon, Tab, Tabs, Progress } from 'wot-design'

const UIComponents = [Icon, Tab, Tabs, Progress]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin
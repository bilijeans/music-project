import { Icon, Tab, Tabs} from 'wot-design'

const UIComponents = [Icon, Tab, Tabs]

const WotUIPlugin = {}

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(component => {

        Vue.use(component)
    })
}

export default WotUIPlugin
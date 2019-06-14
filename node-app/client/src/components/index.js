import Vue from 'vue'
import HeaderCom from './headerCom'
import FooterCom from './footerCom'

const components = [
    HeaderCom,
    FooterCom
]

const HD_UI = function(Vue, opts = {}) {
    components.map(component => {
      Vue.component(component.name, component);
    });
};

export default HD_UI
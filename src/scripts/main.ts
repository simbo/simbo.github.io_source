import '../styles/main.styl';

import Vue from 'vue';

import { components } from './components/index';

Object.entries(components).forEach(([componentName, component]) => {
  Vue.component(componentName, component);
});

new Vue({
  el: '.vue'
});

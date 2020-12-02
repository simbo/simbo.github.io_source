import Vue from 'vue';

import { components } from './components/index';
import { messageBus } from './modules/message-bus';

Object.entries(components).forEach(([componentName, component]) => {
  Vue.component(componentName, component);
});

new Vue({
  el: '.view',

  methods: {
    onClickView(ev) {
      if (document.documentElement.offsetWidth < 768) {
        messageBus.$emit('request:sidebar:hide');
      }
    },

    onClickTerminal(ev) {
      if (ev.target.tagName === 'A' || ev.target.parentElement.tagName === 'A') {
        ev.stopPropagation();
        ev.preventDefault();
        messageBus.$emit('request:sidebar:toggle');
      }
    }
  }
});

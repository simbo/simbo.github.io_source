import Vue from 'vue';
import { messageBus } from '../../modules/message-bus';

export default Vue.extend({

  data() {
    return {
      visible: false
    };
  },

  created() {
    messageBus.$on('request:sidebar:show', () => this.show());
    messageBus.$on('request:sidebar:hide', () => this.hide());
    messageBus.$on('request:sidebar:toggle', () => this.toggle());
  },

  methods: {

    show(): void {
      this.visible = true;
    },

    hide(): void {
      this.visible = false;
    },

    toggle(): void {
      this.visible = !this.visible;
    }

  }

});

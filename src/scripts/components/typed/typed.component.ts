import Vue, { VNode } from 'vue';
import Typed from 'typed.js';
import * as shortid from 'shortid';

export default Vue.extend({

  props: {
    speed: {
      type: Number,
      default: 30
    }
  },

  data() {
    const id = shortid.generate();
    return {
      viewportId: `typed-viewport-id${id}`,
      typed: null
    };
  },

  mounted() {
    this.typed = new Typed(`#${this.viewportId}`, {
      strings: this.getContentStrings(),
      typeSpeed: this.speed,
      contentType: 'html',
      showCursor: false
    });
  },

  methods: {

    getContentStrings(): string[] {
      const pauseStep = 250;
      const content = (this.$refs.content as HTMLElement).innerHTML
        // remove all linebreak chars
        .replace(/[\r\n]+/g, '')
        // replace pause <span>s with typed.js pause codes
        .replace(/<span\s+pause="([0-9]+)"><\/span>/gi, (match, group) => `^${group}`)
        // replace html breaks with linebreak chars
        .replace(/<br\s*\/?>/gi, '\n')
      return [ content ];
    }

  }

});

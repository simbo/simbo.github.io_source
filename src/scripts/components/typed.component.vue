<script lang="ts">
import Vue from 'vue';
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
        // replace wrapping PRE
        .replace(/^<pre>|<\/pre>$/gi, '')
        // remove all linebreak chars
        .replace(/[\r\n]+/g, '')
        // replace pause <span>s with typed.js pause codes
        .replace(/<span\s+pause="([0-9]+)"><\/span>/gi, (match, group) => `^${group}`)
        // replace html breaks with linebreak chars
        .replace(/<br\s*\/?>/gi, '\n');
      return [content];
    }
  }
});
</script>

<template lang="pug">
.typed
  .typed__viewport(:id="viewportId")
  .typed__content(ref="content")
    slot
</template>

<style lang="scss">
@keyframes blink {
  to {
    visibility: hidden;
  }
}

.typed {
  white-space: pre-wrap;

  &__viewport {
    white-space: pre-wrap;

    &::after {
      content: '';
      display: inline-block;
      width: 0.55em;
      height: 1em;
      background-color: currentColor;
      line-height: 1;
      opacity: 0.8;
      transform: translate(0.05em, 0.15em);
      animation: blink 0.8s steps(2, start) infinite;
    }
  }

  &__content {
    display: none;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: 'unicorn'
    },
    filter: {
      type: String,
      default: null
    }
  },

  computed: {
    symbolLink(): string {
      return `#svg-symbol__${this['name']}`;
    },
    filterUrl(): string | false {
      return this.filter ? `url(#${this.filter})` : false;
    }
  }
});
</script>

<template lang="pug">
mixin svgSymbol(name, width=512, height=null)
  if (height === null)
    - var height = width
  symbol(
    v-if=`name == '${name}'`,
    id=`svg-symbol__${name}`,
    viewBox=`0 0 ${width} ${height}`
  )
    block

.svg-icon
  svg(viewBox="0 0 512 512", xmlns="http://www.w3.org/2000/svg")
    use(:xlink:href = "symbolLink", :filter="filterUrl")
    include filters/grayscale
    include icons/unicorn
    include icons/paper-plane
    include icons/octocat
    include icons/secure
    include icons/twitter
    include icons/npm
</template>

<style lang="scss">
.svg-icon {
  position: relative;
  width: 100%;
  line-height: 1;

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
    width: 100%;
    height: 0;
  }

  &.is-inline {
    display: inline-block;
    width: 1em;
    vertical-align: -0.1em;
  }

  svg {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

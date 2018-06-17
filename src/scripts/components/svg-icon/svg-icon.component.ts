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
    filterUrl(): string|false {
      return this.filter ? `url(#${this.filter})` : false;
    }
  }

});

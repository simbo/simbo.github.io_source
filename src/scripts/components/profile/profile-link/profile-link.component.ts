import Vue from 'vue';

export default Vue.extend({

  props: {
    url: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isHover: false
    }
  }

});

<script lang="ts">
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
    };
  }
});
</script>

<template lang="pug">
a.profile-link(
  :href="url",
  @mouseenter="isHover = true",
  @mouseleave="isHover = false",
  :class="{'is-hovered': isHover}"
)
  .profile-link__icon
    svg-icon(:name="icon", :filter="isHover ? null : 'grayscale'")
  | {{ label }}
  small.profile-link__description(v-if="description") {{ description }}
</template>

<style lang="scss">
@import './../profile.component.vars';

.profile-link {
  display: block;
  position: relative;
  margin: 0 -1rem;
  // prettier-ignore
  padding: _($profile, 'link', 'padding') _($profile, 'padding', 'x') _($profile, 'link', 'padding')
    (
      _($profile, 'padding', 'x')
      + _($profile, 'link', 'icon', 'size')
      + _($profile, 'link', 'indent')
      + _($profile, 'link', 'padding')
    );
  text-decoration: none;
  color: currentColor;
  font-size: 0.75rem;

  &.is-hovered,
  &:focus {
    background: _($colors, 'iron');
    color: _($colors, 'shark');
    text-shadow: none;
  }

  &__icon {
    position: absolute;
    display: block;
    top: (_($profile, 'link', 'icon', 'offset') + (math.div(_($profile, 'link', 'icon', 'size'), 2)));
    left: (_($profile, 'padding', 'x') + _($profile, 'link', 'indent'));
    width: _($profile, 'link', 'icon', 'size');
    transform: translateY(-50%);
    transition: transform ease 0.2s;
  }

  &.is-hovered &__icon {
    transform: translateY(-50%) scale(1.25);
  }

  &__description {
    display: block;
    font-size: 0.625rem;
    opacity: 0.65;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { messageBus } from '../modules/message-bus';

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
</script>

<template lang="pug">
.sidebar(:class="{'is-visible': visible, 'is-hidden': !visible}")
  .sidebar__toggle(@click.prevent.stop="toggle()")
  .sidebar__content(@click.stop="")
    slot
  .sidebar__close(@click.prevent.stop="hide()") ✕
  a.sidebar__version(href="https://github.com/simbo/simbo.github.io_source", title="Sources on GitHub")=`v${VERSION}`
</template>

<style lang="scss">
$sidebar-transition: ease 0.4s;
$sidebar-transition--fast: ease 0.2s;

.sidebar {
  position: relative;
  display: flex;
  justify-content: space-between;
  background: _($colors, 'porcelain');

  &__toggle {
    flex: 0 0 auto;
    position: relative;
    background: _($colors, 'emperor');
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity $sidebar-transition--fast;

      .sidebar.is-visible & {
        opacity: 0;
      }
    }
  }

  &__content {
    @include momentum-scrolling();
    flex: 1 1 auto;
    width: 100%;
  }

  @include mq('mobile') {
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: calc(100vh - 3.5rem);
    transition: transform $sidebar-transition;

    &__toggle {
      height: 2px;
      width: 100%;
      transition: height $sidebar-transition;

      &::before {
        width: calc(100% - 4rem);
        height: 8px;
        border-top: 2px dotted _($colors, 'rollingStone');
        border-bottom: 2px dotted _($colors, 'rollingStone');
      }
    }

    &.is-visible {
      transform: translateY(0);
    }

    &,
    &.is-hidden {
      transform: translateY(calc(100% - 32px));
    }

    &.is-hidden &__toggle {
      height: 32px;
    }
  }

  @include mq('>=tablet') {
    flex: 0 0 auto;
    flex-direction: row-reverse;
    width: 16rem;
    transition: margin-left $sidebar-transition--fast;

    &__toggle {
      height: 100%;
      width: 2px;
      transition: width $sidebar-transition--fast;

      &::before {
        width: 7px;
        height: calc(100% - 4rem);
        border-left: 2px dotted _($colors, 'rollingStone');
        border-right: 2px dotted _($colors, 'rollingStone');
      }
    }

    &.is-visible {
      margin-left: 0;
    }

    &,
    &.is-hidden {
      margin-left: calc(-16rem + 24px);
    }

    &.is-hidden &__toggle {
      width: 24px;
    }
  }

  &__version,
  &__close {
    position: absolute;
    right: 0.5rem;
    color: rgba(_($colors, 'abbey'), 0.5);
    line-height: 1;
    opacity: 0;
    transition: opacity $sidebar-transition--fast;

    .sidebar.is-visible & {
      opacity: 1;
    }
  }

  &__version {
    bottom: 0.5rem;
    font-size: 0.5em;
  }

  &__close {
    display: block;
    top: 0.5rem;
    width: 1em;
    height: 1em;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: _($colors, 'abbey');
    }
  }
}
</style>

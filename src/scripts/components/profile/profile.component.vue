<script lang="ts" src="./profile.component.ts">
import Vue from 'vue';
import ProfileLinkComponent from './profile-link/profile-link.component.vue';

export default Vue.extend({
  components: {
    'profile-link': ProfileLinkComponent
  },

  data() {
    return {};
  }
});
</script>

<template lang="pug" src="./profile.component.pug">
.profile

  .profile__section
    img.profile__avatar(src="/assets/simbo-avatar.png", alt="Simon Lepel")
    p.profile__nickname simbo
    h1.profile__name Simon Lepel
    p.profile__bio.
      Nerd, developer & web enthusiast. Got lost in Berlin. Spending too much
      time in front of screens…

  .profile__section
    .profile__headline Connect
    ul
      li
        profile-link(
          url="mailto:simbo@simbo.de",
          label="simbo@simbo.de",
          icon="paper-plane"
        )
      li
        profile-link(
          url="/files/simbo-pubkey.asc",
          label="GPG Key 7AAD1A8E",
          icon="secure",
          description="Fingerprint 80A9 F0A9 2D6D BA74 1D3B 9CBF D113 1CED 7AAD 1A8E"
        )
      li
        profile-link(
          url="https://twitter.com/simbo23",
          label="simbo23 @ Twitter",
          icon="twitter"
        )
      li
        profile-link(
          url="https://github.com/simbo",
          label="simbo @ GitHub",
          icon="octocat"
        )
      li
        profile-link(
          url="https://www.npmjs.com/~simbo",
          label="simbo @ npm",
          icon="npm"
        )
</template>

<style lang="scss" src="./profile.component.scss">
@import './profile.component.vars';

.profile {
  display: flex;
  flex-direction: column;
  padding: _($profile, 'padding', 'y') _($profile, 'padding', 'x');
  width: 100%;
  color: _($colors, 'abbey');
  line-height: 1.5;
  text-shadow: 1px 1px 0 _($colors, 'white');
  font-size: 0.875rem;

  @include mq('mobile-landscape') {
    flex-direction: row;
    justify-content: space-between;
  }

  &__section {
    width: 100%;

    @include mq('mobile-landscape') {
      width: calc(50% - #{_($profile, 'padding', 'x')});
    }

    &:not(:last-child) {
      margin-bottom: _($profile, 'spacing');
    }
  }

  &__avatar {
    display: block;
    margin: 0 auto;
    width: _($profile, 'avatarSize', 'mobile');
    height: _($profile, 'avatarSize', 'mobile');
    margin-bottom: _($profile, 'spacing');
    border-radius: 50%;
    overflow: hidden;

    @include mq('tablet') {
      width: _($profile, 'avatarSize', 'tablet');
      height: _($profile, 'avatarSize', 'tablet');
    }

    @include mq('desktop') {
      width: _($profile, 'avatarSize', 'desktop');
      height: _($profile, 'avatarSize', 'desktop');
    }
  }

  &__nickname,
  &__name {
    text-align: center;
    font-weight: bold;
    line-height: 1.2;
    color: _($colors, 'boulder');
  }

  &__nickname {
    opacity: 0.65;
    font-size: 1rem;
  }

  &__name {
    font-size: 1.125rem;
  }

  &__bio {
    margin: _($profile, 'spacing') 0;
  }

  &__headline {
    color: _($colors, 'boulder');
    font-weight: bold;
    margin: 0 0 _($profile, 'link', 'padding') 0;
    font-size: 0.75rem;
  }
}
</style>

<template lang="">
  <div class="burger-menu__body">
    <div class="burger-menu__content">
      <div v-if="isLogined" class="burger-menu__block">
        <button
          class="header__profile _icon-profile"
        >
          <router-link @click="$emit('closeBurger')" :to="profileUrl">Profile</router-link>
        </button>
      </div>
      <div class="burger-menu__block">
        <ul class="burger-menu__list">
          <li class="burger-menu__item">
            <router-link @click="$emit('closeBurger')" to="/" href="#" class="burger-menu__link _icon-home">Home</router-link>
          </li>
          <li class="burger-menu__item">
            <a href="#" class="burger-menu__link _icon-about">About</a>
          </li>
          <li class="burger-menu__item">
            <a href="#" class="burger-menu__link _icon-faq">FAQ</a>
          </li>
          <li class="burger-menu__item">
            <a href="#" class="burger-menu__link _icon-support">Support</a>
          </li>
        </ul>
      </div>
      <div class="burger-menu__block">
        <ul class="subscribe__list">
          <li class="subscribe__item">
            <router-link @click="$emit('closeBurger')" to="/netflix" href="#" class="subscribe__link">Netflix</router-link>
          </li>
          <li class="subscribe__item">
            <router-link @click="$emit('closeBurger')" to="/youtube" href="#" class="subscribe__link">YouTube</router-link>
          </li>
          <li class="subscribe__item">
            <router-link @click="$emit('closeBurger')" to="/spotify" href="#" class="subscribe__link">Spotify</router-link>
          </li>
        </ul>
      </div>
      <div v-if="!isLogined" class="burger-menu__auth burger-auth">
        <button @click="activePopup('login')" class="burger-auth__login" data-popup-button="login">Login</button>
        <button @click="activePopup('registration')" class="burger-auth__sign-up" data-popup-button="create">Sign up</button>
      </div>
      <div v-if="isLogined" class="burger-menu__logout">
        <a @click="activePopup('confirm')" href="#" class="burger-menu__logout-button _icon-profile-exit">Log out</a>
      </div>
      <div class="burger-menu__footer">
        <div class="burger-menu__socials">
          <a href="#" class="whatsapp _icon-whatsapp"></a>
          <a href="#" class="telegram _icon-telegram"></a>
        </div>
        <div class="burger-menu__language burger-language">
          <div @click="languageDropActive = !languageDropActive" class="burger-language__current _icon-arrow">
            en
          </div>
          <div v-if="languageDropActive" class="burger-language__drop drop-menu">
            <ul class="burger-language__list">
              <li class="burger-language__item">
                <a class="burger-language__link" href="#">English</a>
              </li>
              <li class="burger-language__item">
                <a class="burger-language__link" href="#">Ukraine</a>
              </li>
              <li class="burger-language__item">
                <a class="burger-language__link" href="#">Russian</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  emits: ['closeBurger'],
  props: {
    profileUrl: String
  },
  data() {
    return {
      languageDropActive: false
    }
  },
  methods: {
    ...mapActions([
      'activePopup'
    ])
  },
  computed: {
      ...mapGetters([
      'isLogined',
    ])
  }
};
</script>

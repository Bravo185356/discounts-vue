<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__logo">
        <img src="../assets/images/logo.png" alt="Логотип" />
        <div class="header__name">DiscountsOnServices</div>
      </router-link>
      <nav class="header__menu menu">
        <ul class="menu__list">
          <li class="menu__item subscriptions">
            <a
              @click.prevent="subscriptionDrop = !subscriptionDrop"
              href="#"
              class="menu__link _icon-arrow"
              >Subscriptions</a
            >
            <transition name="drop-menu">
              <div v-if="subscriptionDrop" class="subscriptions__drop drop-menu">
                <ul class="subscriptions__list">
                  <li class="subscriptions__item">
                    <router-link
                      @click="closeAllDrops"
                      to="/netflix"
                      class="subscriptions__link"
                      href="#"
                      >Netflix</router-link
                    >
                  </li>
                  <li class="subscriptions__item">
                    <router-link
                      @click="closeAllDrops"
                      to="/youtube"
                      class="subscriptions__link"
                      href="#"
                      >YouTube Premium</router-link
                    >
                  </li>
                  <li class="subscriptions__item">
                    <router-link
                      @click="closeAllDrops"
                      to="/spotify"
                      class="subscriptions__link"
                      href="#"
                      >Spotify</router-link
                    >
                  </li>
                </ul>
              </div>
            </transition>
          </li>
          <li class="menu__item"><router-link to="/faq" class="menu__link">FAQ</router-link></li>
          <li class="menu__item"><a href="#" class="menu__link">Support</a></li>
          <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        </ul>
      </nav>
      <div class="header__socials">
        <div class="_icon-whatsapp"></div>
        <div class="_icon-telegram"></div>
      </div>
      <div class="header__language language">
        <div @click="languageDrop = !languageDrop" class="language__current _icon-arrow">
          en
        </div>
        <transition name="drop-menu">
          <div v-if="languageDrop" class="language__drop drop-menu">
            <ul class="language__list">
              <li class="language__item">
                <a class="language__link" href="#">English</a>
              </li>
              <li class="language__item">
                <a class="language__link" href="#">Ukraine</a>
              </li>
              <li class="language__item">
                <a class="language__link" href="#">Russian</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="header__login">
        <button
          v-if="!isLogined"
          class="header__login-button"
          @click="changeActivePopup('login')"
        >
          Log in
        </button>
        <button
          @click="profileMenuOpen = !profileMenuOpen"
          v-else
          class="header__profile _icon-profile"
        >
          <span>Profile</span>
        </button>
        <div v-if="profileMenuOpen" class="header__profile-menu profile-menu">
          <ul class="profile-menu__list">
            <router-link
              @click="profileMenuOpen = !profileMenuOpen"
              :to="profileURL"
              class="profile-menu__item"
              >My Profile</router-link
            >
            <li @click.prevent="logout" class="profile-menu__item">Logout</li>
          </ul>
        </div>
      </div>
      <div @click="changeBurgerState" class="burger-menu">
        <span></span>
      </div>
    </div>
  </header>
  <transition name="burger">
    <burger-menu
      @close-burger="changeBurgerState"
      :profileUrl="profileURL"
      v-if="burgerMenuOpen"
    ></burger-menu>
  </transition>
</template>
<script>
import BurgerMenu from "./BurgerMenu.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BurgerMenu,
  },
  data() {
    return {
      profileMenuOpen: false,
      subscriptionDrop: false,
      languageDrop: false,
      burgerMenuOpen: false,
    };
  },
  methods: {
    ...mapActions(["changeActivePopup"]),
    logout() {
      this.changeActivePopup("confirm");

      this.profileMenuOpen = false;
    },
    closeAllDrops() {
      this.subscriptionDrop = false;
      this.languageDrop = false;
    },
    changeBurgerState() {
      this.burgerMenuOpen = !this.burgerMenuOpen;
    },
  },
  computed: {
    profileURL() {
      return `/profile/${this.currentUser.localId}`;
    },
    isLogined() {
      return this.$store.getters.isLogined;
    },
    ...mapGetters(["isLogined", "currentUser"]),
  },
};
</script>
<style lang="scss">
.burger-enter-active,
.burger-leave-active {
  transition: transform 0.2s linear;
}
.burger-enter-from,
.burger-leave-to {
  transform: translateX(100%);
}
.burger-enter-to {
  transform: translateX(0%);
}
.burger-leave-from {
  transform: translateX(0%);
}
.drop-menu-enter-active,
.drop-menu-leave-to {
  transition: opacity 0.3s ease;
}
.drop-menu-enter-from,
.drop-menu-leave-to {
  opacity: 0;
}
</style>

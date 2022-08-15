<template lang="">
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__columns">
        <div class="footer__column footer-about">
          <div class="footer-about__logo">
            <img src="../assets/images/logo.png" alt="" />
            <div class="footer-about__title">DiscountsOnServices</div>
          </div>
          <div class="footer-about__description">It's simple, fast and <span>economical</span></div>
        </div>
        <div class="footer__column footer-column">
          <div class="footer-column__title">Subscriptions</div>
          <ul class="footer-column__list">
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">Netflix</a>
            </li>
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">YouTube Premium</a>
            </li>
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">Spotify</a>
            </li>
          </ul>
        </div>
        <div class="footer__column footer-column">
          <div class="footer-column__title">Site navigation</div>
          <ul class="footer-column__list">
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">About</a>
            </li>
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">FAQ</a>
            </li>
            <li class="footer-column__item">
              <a href="#" class="footer-column__link">Support</a>
            </li>
          </ul>
        </div>
        <div class="footer__column footer-column">
          <div class="footer-column__socials">
            <div class="_icon-telegram"></div>
            <div class="_icon-whatsapp"></div>
          </div>
          <div class="footer-column__language footer-language">
            <div
              class="footer-column__language-current _icon-arrow"
              @click="languageDrop = !languageDrop"
            >
              EN
            </div>
            <transition name="drop-menu">
              <div v-if="languageDrop" class="footer-language__drop drop-menu">
                <ul class="footer-language__list">
                  <li class="footer-language__item">
                    <a class="footer-language__link" href="#">English</a>
                  </li>
                  <li class="footer-language__item">
                    <a class="footer-language__link" href="#">Ukraine</a>
                  </li>
                  <li class="footer-language__item">
                    <a class="footer-language__link" href="#">Russian</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="footer__privacy">
        <a href="#" class="footer__policy">Privacy Policy</a>
        <div class="footer__copyright">Copyright 2021 © All Rights Reserved</div>
        <div class="footer__developer">Developed by ....</div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      languageDrop: false,
    };
  },
};
</script>
<style lang="scss">
.drop-menu-enter-active,
.drop-menu-leave-to {
  transition: opacity 0.3s ease;
}
.drop-menu-enter-from,
.drop-menu-leave-to {
  opacity: 0;
}
</style>

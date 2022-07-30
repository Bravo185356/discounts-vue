<template lang="">
        <div class="burger-menu__body">
        <div class="burger-menu__content">
          <div class="burger-menu__block">
            <ul class="burger-menu__list">
              <li class="burger-menu__item">
                <a href="#" class="burger-menu__link _icon-home">Home</a>
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
                <a href="#" class="subscribe__link">Netflix</a>
              </li>
              <li class="subscribe__item">
                <a href="#" class="subscribe__link">YouTube</a>
              </li>
              <li class="subscribe__item">
                <a href="#" class="subscribe__link">Spotify</a>
              </li>
            </ul>
          </div>
          <div class="burger-menu__auth burger-auth">
            <button class="burger-auth__login" data-popup-button="login">Login</button>
            <button class="burger-auth__sign-up" data-popup-button="create">
              Sign up
            </button>
          </div>
          <div class="burger-menu__footer">
            <div class="burger-menu__socials">
              <a href="#" class="whatsapp _icon-whatsapp"></a>
              <a href="#" class="telegram _icon-telegram"></a>
            </div>
            <div class="burger-menu__language burger-language">
              <div class="burger-language__current _icon-arrow" data-spoller-button="3">
                en
              </div>
              <div class="burger-language__drop drop-menu" data-spoller-list="3">
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
export default {};
</script>
<style lang="">
</style>
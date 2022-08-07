<template lang="">
  <transition name="popup">
    <div
      v-if="activePopup === 'paid'"
      :class="{ 'popup-open': activePopup === 'paid' }"
      class="popup popup_paid"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__title">Subscription Application</div>
            <div class="popup__close" @click="changeActivePopup('')"></div>
          </div>
          <form class="popup-form">
            <div class="popup-form__input-block">
              <label for="input-name" class="popup-form__label">Enter your name</label>
              <input
                id="input-name"
                placeholder="Anastasia"
                type="text"
                class="popup-form__input input"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="input-email" class="popup-form__label">E-mail</label>
              <input
                id="input-email"
                placeholder="Enter your e-mail"
                type="email"
                class="popup-form__input input"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="input-phone" class="popup-form__label">Phone</label>
              <input
                id="input-phone"
                placeholder="Enter your phone"
                type="text"
                class="popup-form__input input"
              />
            </div>
            <button
              @click.prevent="changeActivePopup('purchase')"
              class="popup-form__submit blue-button"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
  <transition name="popup">
    <div
      v-if="activePopup === 'purchase'"
      :class="{ 'popup-open': activePopup === 'paid' }"
      class="popup popup_purchase"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__title">Purchase payment</div>
            <div @click="changeActivePopup('')" class="popup__close"></div>
          </div>
          <div class="popup__apps">
            <button class="apple-pay">apple-pay</button>
            <button class="google-pay">google-pay</button>
          </div>
          <form class="popup-form">
            <div class="popup-form__input-block">
              <label for="" class="popup-form__label">Card number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                class="popup-form__input input"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="" class="popup-form__label">Expiration Date</label>
              <input type="text" placeholder="ММ/ГГ" class="popup-form__input input" />
            </div>
            <div class="popup-form__input-block">
              <label for="" class="popup-form__label">CVC</label>
              <input type="text" placeholder="CVC" class="popup-form__input input" />
            </div>
          </form>
          <button class="popup-form__submit blue-button" type="submit">
            Pay with card
          </button>
          <div class="popup-form__alert">
            We do not collect information on your cards, everything is safe
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["changeActivePopup"]),
  },
  computed: {
    ...mapGetters(["activePopup"]),
  },
};
</script>
<style lang="scss">
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>

<template lang="">
  <login-popup @success-login="$emit('successLogin')"></login-popup>
  <registration-popup></registration-popup>
  <Transition name="popup">
    <div
      v-if="activePopup === 'forgot pass'"
      :class="{ 'popup-open': activePopup === 'forgot pass' }"
      class="popup restore-pass"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__title">Forget Password</div>
            <div class="popup__description">We will send reset code in this emaill.</div>
          </div>
          <form class="popup-form">
            <label class="popup-form__label" for="">Email Address</label>
            <input
              v-model="resetPasswordEmail"
              type="email"
              placeholder="name@gmail.com"
              class="popup-form__input input"
            />
          </form>
          <div class="popup-form__submit-wrapper">
            <button @click="sendResetCode" class="popup-form__submit blue-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import LoginPopup from './LoginPopup.vue'
import RegistrationPopup from './RegistrationPopup.vue'
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
export default {
  emits: ["closePopup", "changePopup", "successLogin"],
  components: {
    RegistrationPopup,
    LoginPopup
  },
  data() {
    return {
      resetPasswordEmail: "",
    };
  },
  computed: {
    ...mapGetters(["activePopup", "getApiKey"]),
  },
  methods: {
    ...mapActions(["changeActivePopup"]),
    
    async sendResetCode() {
      let response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.getApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: this.resetPasswordEmail,
          }),
        }
      );

      let data = await response.json();
    },
    
  },
};
</script>
<style lang="scss" scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>

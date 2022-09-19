<template lang="">
  <Transition name="popup">
    <div
      v-if="activePopup === 'forgot pass'"
      :class="{ 'popup-open': activePopup === 'forgot pass' }"
      class="popup restore-pass"
    >
      <div class="popup__body">
        <div class="popup__content" v-scroll-lock="true">
          <div class="popup__header">
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup-title">Forget Password</div>
            <div class="popup__description">We will send reset code in this emaill.</div>
          </div>
          <form class="popup-form">
            <label class="popup-form__label" for="email">Email Address</label>
            <div v-for="error of v$.resetPasswordEmail.$errors" class="popup__error">
              {{ error.$message }}
            </div>
            <input
              id="email"
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
import { required, email, minLength, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      resetPasswordEmail: "",
      v$: useVuelidate(),
    };
  },
  methods: {
    async sendResetCode() {
      const resultValidation = await this.v$.$validate();
      if (resultValidation) {
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
      }
    },
    ...mapActions(["changeActivePopup"]),
  },
  validations() {
    return {
      resetPasswordEmail: { required, email },
    };
  },
  computed: {
    ...mapGetters(["activePopup", "getApiKey"]),
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
.popup__content {
  height: 100%;
}
.popup-form__submit {
  height: 54px;
}
.popup-title {
  margin-bottom: 12px;
}
</style>

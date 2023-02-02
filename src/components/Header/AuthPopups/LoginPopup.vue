<template>
  <Transition name="popup">
    <div
      v-if="activePopup === 'login'"
      class="popup login"
      :class="{ 'popup-open': activePopup === 'login' }"
      data-popup="login"
    >
      <div class="popup__body">
        <div class="popup__content" v-scroll-lock="true">
          <div class="popup__header">
            <div class="popup-title">Log in</div>
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__create">
              New user?
              <button @click="changeActivePopup('registration')">
                Create an account
              </button>
            </div>
            <div v-if="authError" class="popup-form__error">Ошибка: {{ authError }}</div>
          </div>
          <form class="popup-form">
            <div class="popup-form__item">
              <label for="email-input" class="popup-form__label">Email Address</label>
              <div v-for="error of v$.loginInputs.email.$errors" class="popup-form__error">
                {{ error.$message }}
              </div>
              <input
                type="email"
                class="popup-form__input input"
                placeholder="Enter your e-mail"
                id="email-input"
                v-model="loginInputs.email"
              />
            </div>
            <div class="popup-form__item">
              <label for="password-input" class="popup-form__label">Password</label>
              <div v-for="error of v$.loginInputs.password.$errors" class="popup-form__error">
                {{ error.$message }}
              </div>
              <form @submit.prevent="signInEmailPassword" class="password-input">
                <input
                v-model="loginInputs.password"
                :type="showPassword ? 'text' : 'password'"
                class="popup-form__input input"
                id="password-input"
                />
                <span @click="showPassword = !showPassword">+</span>
              </form>
            </div>

            <div class="popup-form__buttons">
              <a
                href="#"
                @click="changeActivePopup('forgot pass')"
                class="popup-form__forgot"
                >Forgot password?</a
              >
              <button
                @click.prevent="signInEmailPassword"
                type="submit"
                class="popup-form__submit blue-button"
              >
                Log in
              </button>
            </div>
          </form>
          <div class="login__alternative login-alternative">
            <div class="login-alternative__title">
              <span></span>Or sign in with<span></span>
            </div>
            <div class="login-alternative__row">
              <a href="#" class="login-alternative__item">
                <img src="@/assets/images/google-login.png" alt="" />
              </a>
              <a href="#" class="login-alternative__item">
                <img src="@/assets/images/facebook-login.png" alt="" />
              </a>
              <a href="#" class="login-alternative__item">
                <img src="@/assets/images/apple-login.png" alt="" />
              </a>
            </div>
          </div>
          <div class="popup__protected">
            Protected by reCAPTCHA and subject to the Google
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Service.</a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import {AuthAPI} from '@/API/Auth.js'
export default {
  data() {
    return {
      loginInputs: {
        email: "",
        password: "",
      },
      v$: useVuelidate(),
      authError: null,
      showPassword: false
    };
  },
  validations() {
    return {
      loginInputs: {
        email: { required, email },
        password: {
          required: helpers.withMessage("This is required field", required),
          minLengthValue: helpers.withMessage(
            () => "Minimun password length 6",
            minLength(6)
          ),
        },
      },
    };
  },
  computed: {
    ...mapGetters(["activePopup"]),
  },
  methods: {
    async signInEmailPassword() {
      const resultValidation = await this.v$.$validate();
      if (resultValidation) {
        let userInfo = await AuthAPI.login(this.loginInputs)
        if (userInfo.error) {
          this.authError = userInfo.error.message;
          return;
        }

        this.currentUser(userInfo.users[0]);
        this.isLogined(true);

        this.loginInputs.email = "";
        this.loginInputs.password = "";
        this.showPassword = false
        
        this.v$.$reset()
        this.changeActivePopup("");
      }
    },
    ...mapActions(["changeActivePopup", "currentUser", "isLogined"]),
  }
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
  grid-template-rows: repeat(auto-fill, auto);
}
</style>

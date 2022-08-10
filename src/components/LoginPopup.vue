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
            <div v-if="authError" class="popup__error">Ошибка: {{ authError }}</div>
          </div>
          <form class="popup-form">
            <div class="popup-form__item">
              <label for="email-input" class="popup-form__label">Email Address</label>
              <div v-for="error of v$.loginInputs.email.$errors" class="popup__error">
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
              <div v-for="error of v$.loginInputs.password.$errors" class="popup__error">
                {{ error.$message }}
              </div>
              <input
                v-model="loginInputs.password"
                type="password"
                class="popup-form__input input"
                id="password-input"
              />
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
                <img src="../assets/images/google-login.png" alt="" />
              </a>
              <a href="#" class="login-alternative__item">
                <img src="../assets/images/facebook-login.png" alt="" />
              </a>
              <a href="#" class="login-alternative__item">
                <img src="../assets/images/apple-login.png" alt="" />
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
export default {
  emits: ["successLogin"],
  data() {
    return {
      loginInputs: {
        email: "",
        password: "",
      },
      v$: useVuelidate(),
      authError: null,
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
    ...mapGetters(["activePopup", 'getApiKey']),
  },
  methods: {
    async signInEmailPassword() {
      const result = await this.v$.$validate();
      if (result) {
        let response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.getApiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: this.loginInputs.email,
              password: this.loginInputs.password,
              returnSecureToken: true,
            }),
          }
        );

        let userInfo = await response.json();
        if (userInfo.error) {
          this.authError = userInfo.error.message;
          return;
        }
        localStorage.setItem("accessToken", userInfo.idToken);
        localStorage.setItem("refreshToken", userInfo.refreshToken);

        this.changeActivePopup("");
        this.$emit("successLogin");

        this.loginInputs.email = "";
        this.loginInputs.password = "";
        this.v$.$reset()
      }
    },
    ...mapActions(["changeActivePopup"]),
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

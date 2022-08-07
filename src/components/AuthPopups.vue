<template lang="">
  <Transition name="popup">
    <div
      v-if="activePopup === 'login'"
      class="popup login"
      :class="{ 'popup-open': activePopup === 'login' }"
      data-popup="login"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__title">Log in</div>
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__create">
              New user?<button @click="changeActivePopup('registration')">
                Create an account
              </button>
            </div>
            <div v-if="authError" class="popup__error">Ошибка: {{ authError }}</div>
          </div>
          <form class="popup-form">
            <div class="popup-form__item">
              <label for="email-input" class="popup-form__label">Email Address</label>
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
  <Transition name="popup">
    <div
      v-if="activePopup === 'registration'"
      class="popup registration"
      :class="{ 'popup-open': activePopup === 'registration' }"
    >
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__title">Create an account</div>
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__create">
              Already have an account?<button @click="changeActivePopup('login')">
                Sign in
              </button>
            </div>
            <div v-if="authError" class="popup__error">Ошибка:</div>
          </div>
          <form class="popup-form">
            <div class="popup-form__item">
              <label for="name-input" class="popup-form__label">User name</label>
              <input
                type="text"
                class="popup-form__input input"
                placeholder="Enter your name"
                id="name-input"
                v-model="registrationInputs.name"
              />
            </div>
            <div class="popup-form__item">
              <label for="email-input" class="popup-form__label">Email Address</label>
              <input
                type="email"
                class="popup-form__input input"
                placeholder="Enter your e-mail"
                id="email-input"
                v-model="registrationInputs.email"
              />
            </div>
            <div class="popup-form__item">
              <label for="password-input" class="popup-form__label">Password</label>
              <input
                v-model="registrationInputs.password"
                type="password"
                class="popup-form__input input"
                id="password-input"
              />
            </div>
            <div class="popup-form__buttons">
              <div class="popup-form__checkbox">
                <input type="checkbox" />By creating an account you agree to our Privacy
                Policy and Terms of Service.
              </div>
              <button
                @click.prevent="createNewUser"
                type="submit"
                class="popup-form__submit blue-button"
              >
                Sign up
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
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="popup">
    <div v-if="activePopup === 'forgot pass'" :class="{ 'popup-open': activePopup === 'forgot pass' }" class="popup restore-pass">
      <div class="popup__body">
        <div class="popup__content">
          <div class="popup__header">
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__title">Forget Password</div>
            <div class="popup__description">We will send reset code in this emaill.</div>
          </div>
          <form class="popup-form">
            <label class="popup-form__label" for="">Email Address</label>
            <input v-model="resetPasswordEmail" type="email" placeholder="name@gmail.com" class="popup-form__input input" />
          </form>
          <div class="popup-form__submit-wrapper">
            <button @click="sendResetCode" class="popup-form__submit blue-button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  emits: ["closePopup", "changePopup", "successLogin"],
  data() {
    return {
      loginInputs: {
        email: "",
        password: "",
      },
      registrationInputs: {
        name: "",
        email: "",
        password: "",
      },
      resetPasswordEmail: '',
      authError: null,
    };
  },
  computed: {
    ...mapGetters(["activePopup", 'getApiKey']),
  },
  methods: {
    ...mapActions(["changeActivePopup"]),
    async createNewUser() {
      let response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.getApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: this.registrationInputs.email,
            password: this.registrationInputs.password,
            returnSecureToken: true,
          }),
        }
      );

      let newUserInfo = await response.json();

      this.changeActivePopup("");

      this.registrationInputs.name = "";
      this.registrationInputs.email = "";
      this.registrationInputs.password = "";

      this.sendEmailVerification(newUserInfo.idToken);
    },
    async sendResetCode() {
      let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.getApiKey}`, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: this.resetPasswordEmail
        })
      })

      let data = await response.json()


    },
    async sendEmailVerification(idToken) {
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.getApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken,
          }),
        }
      );
    },
    async signInEmailPassword() {
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

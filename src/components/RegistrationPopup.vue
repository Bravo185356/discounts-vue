<template>
  <Transition name="popup">
    <div
      v-if="activePopup === 'registration'"
      class="popup registration"
      :class="{ 'popup-open': activePopup === 'registration' }"
    >
      <div class="popup__body">
        <div class="popup__content" v-scroll-lock="true">
          <div class="popup__header">
            <div class="popup-title">Create an account</div>
            <div class="popup__close" @click="changeActivePopup('')"></div>
            <div class="popup__create">
              Already have an account?
              <button @click="changeActivePopup('login')">Sign in</button>
            </div>
          </div>
          <form class="popup-form">
            <div class="popup-form__item">
              <label for="name-input" class="popup-form__label">User name</label>
              <div
                v-for="error of v$.registrationInputs.name.$errors"
                class="popup__error"
              >
                {{ error.$message }}
              </div>
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
              <div
                v-for="error of v$.registrationInputs.email.$errors"
                class="popup__error"
              >
                {{ error.$message }}
              </div>
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
              <div
                v-for="error of v$.registrationInputs.password.$errors"
                class="popup__error"
              >
                {{ error.$message }}
              </div>
              <input
                v-model="registrationInputs.password"
                type="password"
                class="popup-form__input input"
                id="password-input"
              />
            </div>
            <div class="popup-form__buttons">
              <div
                v-if="showCheckboxErrorMessage && checkboxState === false"
                class="popup__error"
              >
                Необходимо подтверждение
              </div>
              <div class="popup-form__checkbox">
                <input type="checkbox" v-model="checkboxState" />By creating an account
                you agree to our Privacy Policy and Terms of Service.
              </div>
            </div>
            <button
              @click.prevent="createNewUser"
              type="submit"
              class="popup-form__submit blue-button"
            >
              Sign up
            </button>
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
export default {
  data() {
    return {
      registrationInputs: {
        name: "",
        email: "",
        password: "",
      },
      v$: useVuelidate(),
      checkboxState: false,
      showCheckboxErrorMessage: false,
    };
  },
  validations() {
    return {
      registrationInputs: {
        name: {
          required: helpers.withMessage("This is required field", required),
          minLengthValue: minLength(6),
        },
        email: {
          required: helpers.withMessage("This is required field", required),
          email,
        },
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
    ...mapGetters(["activePopup", "getApiKey"]),
  },
  methods: {
    ...mapActions(["changeActivePopup"]),
    async createNewUser() {
      const resultValidation = await this.v$.$validate();
      if (this.checkboxState === false) {
        this.showCheckboxErrorMessage = true;
        return;
      }
      if (resultValidation) {
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
        this.showCheckboxErrorMessage = false;

        this.sendEmailVerification(newUserInfo.idToken);
        this.v$.$reset()
      }
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

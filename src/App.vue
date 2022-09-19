<template>
  <div class="wrapper">
    <div v-if="activeLoader" class="loader"></div>
    <page-header />
    <div class="wrapper__container">
      <router-view />
    </div>
    <page-footer />
    <login-popup @success-login="successLogin" />
    <registration-popup />
    <forgot-password />
    <logout-popup /> 
  </div>
</template>
<script>
import PageHeader from "./components/Header/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import LogoutPopup from "./components/Header/AuthPopups/LogoutPopup.vue";
import LoginPopup from './components/Header/AuthPopups/LoginPopup.vue'
import RegistrationPopup from './components/Header/AuthPopups/RegistrationPopup.vue';
import ForgotPassword from './components/Header/AuthPopups/ForgotPassword.vue'
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PageHeader,
    PageFooter,
    LogoutPopup,
    RegistrationPopup,
    ForgotPassword,
    LoginPopup
  },
  data() {
    return {
      API_KEY: "AIzaSyCRYrVhJoaW0yinGmIi-MR9GMOzWBpaTZg",
      activeLoader: true
    };
  },
  methods: {
    ...mapActions(["currentUser", "isLogined"]),
    successLogin() {
      this.getUserInfo();
    },
    async getUserInfo() {
      let response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.getApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("accessToken"),
          }),
          "Content-Type": "application/json",
        }
      );
      let userInfo = await response.json();
      if (userInfo.error) {
        this.exchangeRefreshToken();
      } else {
        this.currentUser(userInfo.users[0])
        this.isLogined(true);
      }
    },
    async exchangeRefreshToken() {
      let response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${this.getApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            refresh_token: localStorage.getItem("refreshToken"),
            grant_type: "refresh_token",
          }),
          "Content-Type": "application/json",
        }
      );
      let newTokens = await response.json();
      if (newTokens.error) {
        return;
      }

      localStorage.setItem("accessToken", newTokens.id_token);
      localStorage.setItem("refreshToken", newTokens.refresh_token);

      this.getUserInfo();
    },
  },
  computed: {
    ...mapGetters(["activePopup", "getApiKey"])
  },
  async mounted() {
    this.$store.dispatch("setApiKey", this.API_KEY);
    if (localStorage.getItem("accessToken")) {
      await this.getUserInfo();
    }
    this.activeLoader = false
  },
};
</script>
<style lang=""></style>

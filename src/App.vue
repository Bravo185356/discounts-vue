<template lang="">
  <div class="wrapper" :class="{ _lock: pageLock }">
    <page-header @page-lock="pageLock = !pageLock" />
    <div class="wrapper__container">
      <router-view />
    </div>
    <page-footer />
    <auth-popups :apiKey="API_KEY" :popup="activePopup" @success-login="successLogin" />
    <logout-popup v-if="activePopup === 'confirm'" />
  </div>
</template>
<script>
import AuthPopups from "./components/AuthPopups.vue";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import LogoutPopup from "./components/LogoutPopup.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PageHeader,
    AuthPopups,
    PageFooter,
    LogoutPopup,
  },
  data() {
    return {
      API_KEY: "AIzaSyCRYrVhJoaW0yinGmIi-MR9GMOzWBpaTZg",
      pageLock: false,
    };
  },
  methods: {
    ...mapActions(["currentUser", "isLogined"]),
    successLogin() {
      this.getUserInfo();
    },
    async getUserInfo() {
      let response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.API_KEY}`,
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
        this.currentUser(userInfo.users[0]);

        this.isLogined(true);
      }
    },
    async exchangeRefreshToken() {
      let response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${this.API_KEY}`,
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
        console.log(localStorage.getItem("refreshToken"));
        console.log(newTokens.error);
        return;
      }

      localStorage.setItem("accessToken", newTokens.id_token);
      localStorage.setItem("refreshToken", newTokens.refresh_token);

      this.getUserInfo();
    },
  },
  computed: {
    ...mapGetters(["activePopup"]),
  },
  async mounted() {
    if (localStorage.getItem("accessToken")) {
      this.getUserInfo();
    }
  },
};
</script>
<style lang=""></style>

<template lang="">
  <div class="wrapper">
    <page-header :userID="currentUser" :isLogined="isLogined" @logout="logout" @popup-open="popupOpen"></page-header>
    <div class="wrapper__container">
      <router-view :isLogined="isLogined" :currentUser="currentUser"></router-view>
    </div>
    <page-footer></page-footer>
    <auth-popups :apiKey="API_KEY" :popup="activePopup" @success-login="successLogin" @change-popup="popupOpen" @close-popup="activePopup = ''"></auth-popups>
  </div>
</template>
<script>
import AuthPopups from "./components/AuthPopups.vue";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from './components/PageFooter.vue'
export default {
  components: {
    PageHeader,
    AuthPopups,
    PageFooter
  },
  data() {
    return {
      isLogined: false,
      activePopup: "",
      API_KEY: "AIzaSyCRYrVhJoaW0yinGmIi-MR9GMOzWBpaTZg",
      currentUser: {},
    };
  },
  methods: {
    popupOpen(popupName) {
      this.activePopup = popupName;
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      this.isLogined = false;
    },
    successLogin() {
      this.getUserInfo()
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
      if(userInfo.error) {
        this.exchangeRefreshToken();
      } else {
        this.currentUser = userInfo.users[0]
        console.log(this.currentUser)
        this.isLogined = true;
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
      if(newTokens.error) {
        console.log(localStorage.getItem("refreshToken"))
        console.log(newTokens.error)
        return
      }
      console.log(newTokens);

      localStorage.setItem("accessToken", newTokens.id_token);
      localStorage.setItem("refreshToken", newTokens.refresh_token);

      this.getUserInfo();
    },
  },
  async mounted() {
    if (localStorage.getItem("accessToken")) {
      this.getUserInfo();
    }
  },
};
</script>
<style lang="">
</style>
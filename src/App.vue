<template>
  <div @click="isDropActive = false" class="wrapper">
    <div v-if="activeLoader" class="loader"></div>
    <page-header />
    <div class="wrapper__container">
        <router-view />
    </div>
    <page-footer />
    <login-popup />
    <registration-popup />
    <forgot-password />
    <logout-popup />
  </div>
</template>
<script>
import PageHeader from "./components/Header/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import LogoutPopup from "./components/Header/AuthPopups/LogoutPopup.vue";
import LoginPopup from "./components/Header/AuthPopups/LoginPopup.vue";
import RegistrationPopup from "./components/Header/AuthPopups/RegistrationPopup.vue";
import ForgotPassword from "./components/Header/AuthPopups/ForgotPassword.vue";
import { AuthAPI } from "@/API/Auth.js";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PageHeader,
    PageFooter,
    LogoutPopup,
    RegistrationPopup,
    ForgotPassword,
    LoginPopup,
  },
  data() {
    return {
      activeLoader: true,
      isDropActive: false
    };
  },
  methods: {
    ...mapActions(["currentUser", "isLogined"]),
  },
  computed: {
    ...mapGetters(["activePopup", "getApiKey"]),
  },
  async mounted() {
    if (localStorage.getItem("accessToken")) {
      const authResult = await AuthAPI.getUserInfo()
      console.log(authResult)
      if(!authResult.error) {
        this.currentUser(authResult.users[0]);
        this.isLogined(true);
      }
    }
    this.activeLoader = false;
  },
};
</script>

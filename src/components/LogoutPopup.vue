<template lang="">
  <div class="popup popup_no-fullscreen">
    <div class=" popup__body ">
      <div class="popup__content">
        <div class="popup__header">
          <div class="popup__text">Are you sure want to logout?</div>
          <div class="popup__close" @click="activePopup('')"></div>
        </div>
        <div class="popup__buttons">
          <button @click="activePopup('')" class="logout-cancel white-button">
            Cancel
          </button>
          <button @click="logout" class="logout-confirm white-button">
            Yes, logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      this.isLogined(false)
      this.activePopup('')
    },
    ...mapActions([
      'activePopup',
      'isLogined'
    ])
  },
};
</script>
<style lang=""></style>

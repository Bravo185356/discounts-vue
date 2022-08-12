<template lang="">
  <login-popup @success-login="$emit('successLogin')" />
  <registration-popup />
  <forgot-password />
</template>
<script>
import LoginPopup from './LoginPopup.vue'
import RegistrationPopup from './RegistrationPopup.vue';
import ForgotPassword from './ForgotPassword.vue'
export default {
  emits: ["successLogin"],
  components: {
    RegistrationPopup,
    LoginPopup,
    ForgotPassword
  },

};
</script>
<style lang="scss" scoped>

</style>

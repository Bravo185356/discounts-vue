<template>
  <transition name="popup">
    <div
      v-if="activePopup === 'paid'"
      :class="{ 'popup-open': activePopup === 'paid' }"
      class="popup popup_paid"
    >
      <div class="popup__body">
        <div class="popup__content" v-scroll-lock="true">
          <div class="popup__header">
            <div class="popup-title">Subscription Application</div>
            <div class="popup__close" @click="closePopup"></div>
          </div>
          <form class="popup-form">
            <div class="popup-form__input-block">
              <label for="input-name" class="popup-form__label">Enter your name</label>
              <div v-for="error of v$.name.$errors" class="popup__error">
                {{ error.$message }}
              </div>
              <input
                v-model="name"
                id="input-name"
                placeholder="Anastasia"
                type="text"
                class="popup-form__input input"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="input-email" class="popup-form__label">E-mail</label>
              <div v-for="error of v$.email.$errors" class="popup__error">
                {{ error.$message }}
              </div>
              <input
                v-model="email"
                id="input-email"
                placeholder="Enter your e-mail"
                type="email"
                class="popup-form__input input"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="input-phone" class="popup-form__label">Phone</label>
              <div v-for="error of v$.phone.$errors" class="popup__error">
                {{ error.$message }}
              </div>
              <input
                v-model="phone"
                id="input-phone"
                placeholder="Enter your phone"
                v-maska="'###########'"
                type="phone"
                class="popup-form__input input"
              />
            </div>
            <button
              @click.prevent="confirmContacts"
              class="popup-form__submit blue-button"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
export default {

  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    async confirmContacts() {
      const resultValidation = await this.v$.$validate();
      if (resultValidation) {
        this.changeActivePopup("purchase");
      }
    },
    closePopup() {
        this.name = ''
        this.email = ''
        this.phone = ''
        this.changeActivePopup('')
    },
    ...mapActions(["changeActivePopup"]),

  },
  computed: {
    ...mapGetters(['activePopup'])
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      phone: { required },
    };
  },
};
</script>
<style lang=""></style>

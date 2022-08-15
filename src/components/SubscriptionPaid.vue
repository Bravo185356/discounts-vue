<template lang="">
  <contacts-popup />
  <transition name="popup">
    <div
      v-if="activePopup === 'purchase'"
      :class="{ 'popup-open': activePopup === 'purchase' }"
      class="popup popup_purchase"
    >
      <div class="popup__body">
        <div class="popup__content" v-scroll-lock="true">
          <div class="popup__header">
            <div class="popup-title">Purchase payment</div>
            <div @click="changeActivePopup('')" class="popup__close"></div>
          </div>
          <div class="popup__apps">
            <button class="apple-pay">Apple Pay</button>
            <button class="google-pay">Google Pay</button>
          </div>
          <form class="popup-form popup-form_purchase">
            <div class="popup-form__input-block">
              <label for="card-number" class="popup-form__label">Card number</label>
              <div v-for="error of v$.cardNumber.$errors" class="popup__error">
                {{ error.$message }}
              </div>
              <input
                id="card-number"
                placeholder="1234 1234 1234 1234"
                v-maska="'#### #### #### ####'"
                class="popup-form__input input"
                v-model="cardNumber"
                max="16"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="" class="popup-form__label">Expiration Date</label>
              <input
                class="popup-form__input input"
                placeholder="MM/YY"
                v-maska="'##/##'"
              />
            </div>
            <div class="popup-form__input-block">
              <label for="" class="popup-form__label">CVC</label>
              <input
                v-model="cvc"
                type="text"
                placeholder="CVC"
                class="popup-form__input input"
                v-maska="'###'"
              />
              <div v-for="error of v$.cvc.$errors" class="popup__error">
                {{ error.$message }}
              </div>
            </div>
          </form>
          <button
            @click="makePayment"
            class="popup-form__submit blue-button"
            type="submit"
          >
            Pay with card
          </button>
          <div class="popup__alert">
            We do not collect information on your cards, everything is safe
          </div>
          <div class="popup-crypto">
            <div class="popup-title">Payment by crypto wallet</div>
            <label for="crypto-type" class="popup-form__label">Select currency</label>
            <div class="popup-crypto__select">
              <div class="popup-crypto__type">
                {{ selectedCrypto }}
                <span
                  @click.stop="cryptoListVisible = !cryptoListVisible"
                  class="_icon-arrow"
                ></span>
              </div>
              <ul v-if="cryptoListVisible" class="popup-crypto__list">
                <li
                  v-for="crypto in cryptoList"
                  :key="crypto"
                  :class="{ selected: crypto === selectedCrypto }"
                  @click="selectCrypto(crypto)"
                  class="popup-crypto__item"
                >
                  {{ crypto }}
                </li>
              </ul>
            </div>
            <button class="popup-crypto__pay blue-button">Pay</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
import ContactsPopup from "./ContactsPopup.vue";
export default {
  props: {
    selectedPlan: Object
  },
  components: {
    ContactsPopup,
  },
  data() {
    return {
      v$: useVuelidate(),
      cardNumber: "",
      cvc: "",
      expirationDate: {
        expirationMonth: "ММ",
        expirationYear: "YY",
      },
      cryptoListVisible: false,
      selectedCrypto: "Bitcoin",
      cryptoList: ["Bitcoin", "Crypto2", "Crypto3", "Crypto4"],
    };
  },
  methods: {
    ...mapActions(["changeActivePopup"]),
    async makePayment() {
      const resultValidation = await this.v$.$validate();
    },
    selectCrypto(cryptoName) {
      if (cryptoName === this.selectedCrypto) {
        return;
      } else {
        this.selectedCrypto = cryptoName;
        this.cryptoListVisible = false;
      }
    },
  },
  validations() {
    return {
      cardNumber: {
        required,
        minLengthValue: minLength(16),
        maxLengthValue: maxLength(16),
      },
      cvc: { required, minLengthValue: minLength(3), maxLengthValue: maxLength(3) },
    };
  },
  computed: {
    ...mapGetters(["activePopup"]),
    formatedExpirationDate() {
      return `${this.expirationDate.expirationMonth}/${this.expirationDate.expirationYear}`;
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

<template>
  <div class="subscribe-plans">
    <div class="subscribe-plans__title title">Choose a Netflix Plan</div>
    <div class="subscribe-plans__description">
      Listen without limits at a bargain price
    </div>
    <div class="subscribe-plans__duration">
      <div
        @click="subscribeDuration = '6'"
        :class="{ 'duration-selected': subscribeDuration === '6' }"
        class="subscribe-plans__six-month"
      >
        6 months
      </div>
      <div
        @click="subscribeDuration = '12'"
        :class="{ 'duration-selected': subscribeDuration === '12' }"
        class="subscribe-plans__twelve-month"
      >
        12 months
      </div>
    </div>
    <div class="plans">
      <div v-for="sub in subsInfo" class="plans__item">
        <div class="plans__title title">{{ sub.name }}</div>
        <div class="plans-advantages">
          <ul class="plans-advantages__list">
            <li
              v-for="advantage in sub.advantages"
              class="plans-advantages__item _icon-check"
            >
              {{ advantage }}
            </li>
          </ul>
        </div>
        <div class="plans__price">
          <span>$</span
          >{{ subscribeDuration === "6" ? sub.price : Math.round(sub.price * 1.85) }}
        </div>
        <div class="plans__buy">
          <a
            href="#"
            @click.prevent="checkAuth(sub)"
            class="plans__buy-button black-button"
            >Get started</a
          >
        </div>
      </div>
    </div>
  </div>
  <invite-friends />
  <faq-block />
  <subscription-paid :selectedPlan="selectedPlan" />
</template>
<script>
import SubscriptionPaid from "../components/SubscriptionPaid.vue";
import InviteFriends from "../components/InviteFriends.vue";
import FaqBlock from "../components/FAQ/FaqBlock.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    InviteFriends,
    FaqBlock,
    SubscriptionPaid,
  },
  data() {
    return {
      subscribeDuration: "6",
      subsInfo: [
        {
          name: "Basic",
          advantages: [
            "Ad-free music listening",
            "Play anywhere - even offline",
            "On-demand playback",
          ],
          price: 45,
        },
        {
          name: "Standart",
          advantages: [
            "Ad-free music listening",
            "Play anywhere - even offline",
            "On-demand playback",
          ],
          price: 60,
        },
        {
          name: "Premium",
          advantages: [
            "Ad-free music listening",
            "Play anywhere - even offline",
            "On-demand playback",
          ],
          price: 75,
        },
      ],
      selectedPlan: {
        name: '',
        price: ''
      }
    };
  },
  methods: {
    checkAuth(subInfo) {
      if (this.isLogined === false) {
        alert("Залогиньтесь, чтобы сделать покупку");
        return;
      }
      this.createSelectedPlanInfo(subInfo)
      this.changeActivePopup("paid");
    },
    createSelectedPlanInfo(subInfo) {
      this.selectedPlan.name = subInfo.name
      if(this.subscribeDuration === '6') {
        this.selectedPlan.price = subInfo.price 
      } else {
        this.selectedPlan.price = subInfo.price * 1.85
      }
      console.log(this.selectedPlan)
    },
    ...mapActions(["changeActivePopup"]),
  },
  computed: {
    ...mapGetters(['isLogined']),
    planPrice() {
      if(this.subscribeDuration === 6) {
        return 
      }
      return 
    }
  }
};
</script>
<style lang="scss">

</style>

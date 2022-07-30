<template lang="">
    <section class="profile" v-if="isLogined">
      <div class="profile__header">
        <div class="profile__title title">Personal data management</div>
        <router-link to="/" class="profile__exit _icon-profile-exit"
          >Exit the office</router-link
        >
      </div>
      <div class="profile__body">
        <div class="profile__sections">
          <div
            @click="activeSection = 'Info'"
            :class="{ 'active-section': activeSection === 'Info' }"
            class="profile__info _icon-settings _icon-arrow"
          >
            Account Info
            <span
              @click.stop="profileSectionsDropActive = !profileSectionsDropActive"
              class="_icon-arrow"
            ></span>
          </div>
          <ul v-if="profileSectionsDropActive" class="profile__sections-list">
            <div
              @click="activeSection = 'Subscriptions'"
              :class="{ 'active-section': activeSection === 'Subscriptions' }"
              class="profile__subs _icon-subscriptions"
            >
              My subscriptions
            </div>
          </ul>
        </div>
        <div v-if="activeSection === 'Info'" class="info-card">
          <div class="info-card__title">Account info</div>
          <div class="info-card__alert" v-if="currentUser.emailVerified === false">У вас не подтверждена почта!</div>
          <form class="info-card__form info-form">
            <div class="info-form__item">
              <label for="info-card-id" class="info-card__label">ID user</label>
              <input id="info-card-id" class="info-card__input input" :value="currentUser.localId" />
            </div>
            <div class="info-form__item">
              <label for="info-card-id" class="info-card__label"
                >How can I call you?</label
              >
              <input
                id="info-card-id"
                class="info-card__input input"
                placeholder="Enter your name"
              />
            </div>
            <div class="info-form__item">
              <label for="info-card-id" class="info-card__label">E-mail</label>
              <input
                id="info-card-id"
                class="info-card__input input"
                placeholder="Enter your e-mail"
                :value="currentUser.email"
              />
            </div>
            <button type="submit" class="info-from__save blue-button">
              Save changes
            </button>
          </form>
        </div>
        <div v-if="activeSection === 'Subscriptions'" class="subs-card">
          <div class="subs-card__body">
            <div class="subs-card__item">
              <div class="subs-card__service-name spotify">Spotify Premium Duo</div>
              <div class="subs-card__content">
                <div class="subs-card__description">
                  Two separate Premium accounts for people who live together.
                </div>
                <a href="#" class="subs-card__change">Change plan</a>
              </div>
            </div>
            <div class="subs-card__item">
              <div class="subs-card__service-name youtube">YouTube Premium</div>
              <div class="subs-card__content">
                <div class="subs-card__description">
                  YouTube and YouTube Music without ads, in the background and offline
                </div>
                <a href="#" class="subs-card__change">Change plan</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <invite-friends></invite-friends>
    </section>
    <div v-else class="">Вы не залогинены!</div>
</template>
<script>
import InviteFriends from "../components/InviteFriends.vue";
export default {
  props: {
    isLogined: Boolean,
    currentUser: Object
  },
  components: {
    InviteFriends,
  },
  data() {
    return {
      activeSection: "Info",
      profileSectionsDropActive: false,
    };
  },
  methods: {
    changeScreenWidth() {
      screen.width >= 450
        ? (this.profileSectionsDropActive = true)
        : (this.profileSectionsDropActive = false);
    },
  },
  async mounted() {
    window.addEventListener("resize", this.changeScreenWidth);
    this.changeScreenWidth();
    console.log(this.$route.params.id)
    if(this.isLogined) {
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
      let userInfo = await response.json()
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.changeScreenWidth);
  },
};
</script>
<style lang=""></style>

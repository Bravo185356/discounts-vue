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
        <!-- width 600+ -->
        <div v-if="!isMobile" class="sections">
          <div
            @click="activeSection = section"
            v-for="section in sectionList"
            :class="[{'active-section': activeSection.name === section.name} ,section.icon]"
            class="profile__section"
          >
            {{ section.name }}
            <span
              @click.stop="profileSectionsDropActive = !profileSectionsDropActive"
            ></span>
          </div>
        </div>
        <!-- Для мобилок -->
        <div v-else class="sections-mobile">
          <div :class="activeSection.icon" class="profile__section _icon-arrow">
            {{ activeSection.name }}
            <span
              @click.stop="profileSectionsDropActive = !profileSectionsDropActive"
              class="_icon-arrow"
            ></span>
          </div>
          <ul v-if="profileSectionsDropActive" class="profile__sections-list">
            <li
              v-for="section in nonActiveElements"
              @click="changeActiveSection(section)"
              class="profile__section"
              :class="section.icon"
            >
              {{ section.name }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="activeSection.name === 'Account Info'" class="info-card">
        <div class="info-card__title">Account info</div>
        <div class="info-card__alert" v-if="currentUser.emailVerified === false">
          У вас не подтверждена почта!
        </div>
        <form class="info-card__form info-form">
          <div class="info-form__item">
            <label for="info-card-id" class="info-card__label">ID user</label>
            <input
              id="info-card-id"
              class="info-card__input input"
              :value="currentUser.localId"
            />
          </div>
          <div class="info-form__item">
            <label for="info-card-id" class="info-card__label">How can I call you?</label>
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
          <button type="submit" class="info-from__save blue-button">Save changes</button>
        </form>
      </div>
      <div v-if="activeSection.name === 'My subscriptions'" class="subs-card">
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
  <section class="require__login" v-else>
    <div>Войдите в свой профиль, чтобы посмотреть информацию о пользователе</div>
    <button class="blue-button">Войти</button>
  </section>
</template>
<script>
import InviteFriends from "../components/InviteFriends.vue";
import {mapGetters} from 'vuex'
export default {
  components: {
    InviteFriends,
  },
  data() {
    return {
      activeSection: {
        name: "Account Info",
        icon: "_icon-settings",
      },
      sectionList: [
        { name: "Account Info", icon: "_icon-settings" },
        { name: "My subscriptions", icon: "_icon-subscriptions" }
      ],
      profileSectionsDropActive: false,
      screenWidth: 0,
    };
  },
  methods: {
    changeScreenWidth() {
      this.screenWidth = screen.width;
      screen.width >= 600
        ? (this.profileSectionsDropActive = true)
        : (this.profileSectionsDropActive = false);
    },
    changeActiveSection(section) {
      this.activeSection = section;
      if (screen.width <= 600) {
        this.profileSectionsDropActive = false;
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogined',
      'currentUser'
    ]),
    isMobile() {
      return this.screenWidth <= 600 ? true : false;
    },
    nonActiveElements() {
      return this.sectionList.filter(
        (item) => item.name !== this.activeSection.name
      );
    }
  },
  async mounted() {
    window.addEventListener("resize", this.changeScreenWidth);

    this.changeScreenWidth();

    if (this.isLogined) {
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
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.changeScreenWidth);
  },
};
</script>

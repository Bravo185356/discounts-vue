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
        <profile-sections-desktop
          v-if="!isMobile"
          @change-active-section="changeActiveSection"
          :sectionList="sectionList"
          :activeSection="activeSection"
        />
        <!-- Для мобилок -->
        <profile-sections-mobile
          v-else
          @change-drop-visibility="profileSectionsDropActive = !profileSectionsDropActive"
          @change-active-section="changeActiveSection"
          :sectionList="sectionList"
          :profileSectionsDropActive="profileSectionsDropActive"
          :activeSection="activeSection"
          class="sections-mobile"
        />
      </div>
      <profile-user-info :currentUser="currentUser" v-if="activeSection.name === 'Account Info'" />
      <profile-subs-info v-if="activeSection.name === 'My subscriptions'" />
    </div>
    <invite-friends></invite-friends>
  </section>
  <section class="require__login" v-else>
    <div>Войдите в свой профиль, чтобы посмотреть информацию о пользователе</div>
    <button class="blue-button">Войти</button>
  </section>
</template>
<script>
import ProfileSectionsMobile from "../components/ProfilePage/ProfileSections/ProfileSectionsMobile.vue";
import ProfileSectionsDesktop from "../components/ProfilePage/ProfileSections/ProfileSectionsDesktop.vue";
import ProfileSubsInfo from '../components/ProfilePage/ProfileInfoCards/ProfileSubsInfo.vue'
import ProfileUserInfo from '../components/ProfilePage/ProfileInfoCards/ProfileUserInfo.vue'
import InviteFriends from "../components/InviteFriends.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    InviteFriends,
    ProfileSectionsMobile,
    ProfileSectionsDesktop,
    ProfileUserInfo,
    ProfileSubsInfo
  },
  data() {
    return {
      activeSection: {
        name: "Account Info",
        icon: "_icon-settings",
      },
      sectionList: [
        { name: "Account Info", icon: "_icon-settings" },
        { name: "My subscriptions", icon: "_icon-subscriptions" },
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
    },
  },
  computed: {
    ...mapGetters(["isLogined", "currentUser"]),
    isMobile() {
      return this.screenWidth <= 600 ? true : false;
    },
    
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

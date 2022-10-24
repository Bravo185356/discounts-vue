<template>
    <div class="info-card">
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
            <label for="info-card-name" class="info-card__label">How can I call you?</label>
            <input
              id="info-card-name"
              class="info-card__input input"
              placeholder="Enter your name"
            />
          </div>
          <div class="info-form__item">
            <label for="info-card-email" class="info-card__label">E-mail</label>
            <input
              id="info-card-email"
              class="info-card__input input"
              placeholder="Enter your e-mail"
              :value="currentUser.email"
            />
          </div>
          <button type="submit" class="info-from__save blue-button">Save changes</button>
        </form>
      </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props: {
        currentUser: Object
    },
    computed: {
        ...mapGetters(["isLogined", "currentUser"]),
    }
}
</script>
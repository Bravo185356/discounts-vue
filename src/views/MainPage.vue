<template lang="html">
    <main class="main">
      <section class="start">
        <div class="start__container">
          <div class="start__block_1">
            <div class="start__title">Start enjoying a benefit of up to 50%</div>
            <div class="start__text">
              You have always wanted to get the same product at a special price for you,
              without haggling - and it is yours.
            </div>
            <a href="#" class="start__button">Start using</a>
          </div>
          <div class="start__block_2">
            <img src="../assets/images/start-using-image.jpg" alt="Картинка" />
          </div>
        </div>
      </section>
      <section class="choose-sub">
        <div class="choose-sub__container">
          <div class="choose-sub__title">Choose a subscription</div>
          <div class="choose-sub__body">
            <div class="choose-sub__item subscribe-item">
              <div class="subscribe-item__content">
                <div class="subscribe-item__title">Netflix subscription rates</div>
                <div class="subscribe-item__text">
                  The constant contributes to the task of the same and thus the intended
                  features and the set relation to the check and set also.
                </div>
                <router-link to="/netflix" class="subscribe-item__learn-more blue-button">Learn more</router-link>
              </div>
              <div class="subscribe-item__image">
                <img src="../assets/images/netflix-sub.png" alt="" />
              </div>
            </div>
            <div class="choose-sub__item subscribe-item">
              <div class="subscribe-item__content">
                <div class="subscribe-item__title">Spotify subscription rates</div>
                <div class="subscribe-item__text">
                  The constant contributes to the task of the same and thus the intended
                  features and the set relation to the check and set also.
                </div>
                <router-link to="/spotify" class="subscribe-item__learn-more blue-button">Learn more</router-link>
              </div>
              <div class="subscribe-item__image">
                <img src="../assets/images/spotify-sub.png" alt="" />
              </div>
            </div>
            <div class="choose-sub__item subscribe-item">
              <div class="subscribe-item__content">
                <div class="subscribe-item__title">Youtube subscription rates</div>
                <div class="subscribe-item__text">
                  The constant contributes to the task of the same and thus the intended
                  features and the set relation to the check and set also.
                </div>
                <router-link to="/youtube" class="subscribe-item__learn-more blue-button">Learn more</router-link>
              </div>
              <div class="subscribe-item__image">
                <img src="../assets/images/yt-sub.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="how-works">
        <div class="how-works__container">
          <div class="how-works__title title">How it works?</div>
          <div class="how-works__steps steps">
            <div class="steps__item">
              <div class="steps__image">
                <img src="../assets/images/step-1.png" alt="" />
              </div>
              <div class="steps__title">Step 1</div>
              <div class="steps__description">Enter your account information</div>
            </div>
            <div class="steps__item">
              <div class="steps__image">
                <img src="../assets/images/step-2.png" alt="" />
              </div>
              <div class="steps__title">Step 2</div>
              <div class="steps__description">
                Select the desired subscription and plan
              </div>
            </div>
            <div class="steps__item">
              <div class="steps__image">
                <img src="../assets/images/step-3.png" alt="" />
              </div>
              <div class="steps__title">Step 3</div>
              <div class="steps__description">Pay your bill with PayPal</div>
            </div>
          </div>
          <invite-friends></invite-friends>
        </div>
      </section>
      <section class="about">
        <div class="about__container">
          <div class="about__title title">About us</div>
          <div class="about__body">
            <div class="about__description">
              <div class="about__icon">
                <img src="../assets/images/about-logo.png" alt="" />
              </div>
              <div class="about__text">
                We offer you a subscription to various media services at the best price.
              </div>
              <div class="about__text">
                We have partnered with several companies to help you find the best
                prices for your media subscriptions and provide you with the best prices
                for the Premium subscriptions you want.
              </div>
              <div class="about__text about__text_bold">
                It's simple, fast and economical.
              </div>
            </div>
            <div class="about__image">
              <img src="../assets/images/about-img.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <faq-block></faq-block>
      <section class="sub-request">
        <div class="sub-request__container">
          <div class="sub-request__body">
            <div class="sub-request__text">
              <div class="sub-request__title">
                Request for an additional subscription that was not found here
              </div>
              <div class="sub-request__additional-subs">
                Disney, Amazon Prime, Microsoft Office, Microsoft Windows
              </div>
            </div>
            <div class="sub-request__button">Request</div>
          </div>
        </div>
      </section>
    </main>
</template>
<script>
import InviteFriends from '../components/InviteFriends.vue';
import FaqBlock from '../components/FaqBlock.vue';
export default {
  components: {
    InviteFriends,
    FaqBlock
  }
};
</script>
<style lang="scss">
</style>

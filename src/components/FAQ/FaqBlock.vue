<template lang="">
    <section class="faq">
        <div class="faq__container">
          <div class="faq__title title">FAQ</div>
          <div class="faq__body">
            <div class="faq__questions">
              <faq-question>
                <template #question>The set time has passed, but the invoice has not yet arrived, what should I do?</template>
                <template #answer>Answer</template>
              </faq-question>
              <faq-question>
                <template #question>Can I change my Netflix account email and password after purchase?</template>
                <template #answer>Answer</template>
              </faq-question>
              <faq-question>
                <template #question>Can I add a phone number for password recovery?</template>
                <template #answer>Answer</template>
              </faq-question>
              <faq-question>
                <template #question>How soon will I receive the account information I ordered?</template>
                <template #answer>Answer</template>
              </faq-question>
              <faq-question>
                <template #question>How to pay?</template>
                <template #answer>Answer</template>
              </faq-question>
            </div>
            <button class="faq__support black-button">Support</button>
          </div>
        </div>
      </section>
</template>
<script>
import FaqQuestion from './FaqQuestion.vue';
export default {
    components: {
        FaqQuestion
    }
}
</script>
<style lang="">
    
</style>
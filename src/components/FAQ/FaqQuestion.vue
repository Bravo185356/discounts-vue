<template>
  <div @click="answerIsOpen = !answerIsOpen" :class="{ 'answer-show': answerIsOpen }" class="faq__question question">
    <div class="question__body">
      <div class="question__text"><slot name="question"></slot></div>
      <div class="question__show-answer _icon-arrow"></div>
    </div>
    <transition name="question">
        <div v-if="answerIsOpen" class="question__answer"><slot name="answer"></slot></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      answerIsOpen: false,
    };
  },
};
</script>
<style lang="scss">
.question-enter-active,
.question-leave-active {
    transition: all 0.5s ease;
}
.question-enter-from,
.question-leave-to {
    opacity: 0;
    max-height: 0px;
}
.question-enter-to,
.question-leave-from {
    max-height: 500px;
}
</style>
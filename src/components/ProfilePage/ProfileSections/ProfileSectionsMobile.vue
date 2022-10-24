<template lang="">
  <div class="sections-mobile">
    <div :class="activeSection.icon" class="profile__section _icon-arrow">
      {{ activeSection.name }}
      <span @click.stop="$emit('changeDropVisibility')" class="_icon-arrow"></span>
    </div>
    <ul v-if="profileSectionsDropActive" class="profile__sections-list">
      <li
        v-for="section in nonActiveElements"
        @click="$emit('changeActiveSection', section)"
        class="profile__section"
        :class="section.icon"
      >
        {{ section.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    sectionList: Array,
    profileSectionsDropActive: Boolean,
    activeSection: Object
  },
  computed: {
    nonActiveElements() {
      return this.sectionList.filter((item) => item.name !== this.activeSection.name);
    },
  },
};
</script>
<style lang=""></style>

<template lang="">
    <div class="sections">
        <div
          @click="$emit('changeActiveSection', section)"
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
</template>
<script>
export default {
    props: {
        sectionList: Array,
        profileSectionsDropActive: Boolean,
        activeSection: Object
    }
}
</script>
<style lang="">
    
</style>
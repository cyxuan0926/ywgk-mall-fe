<template>
  <div class="error-header">
    <v-layout
      row
      class="header">
      <v-flex
        xs12>
        <div
          class="header-toolbar">
          <v-toolbar
            app
            :flat="true"
            color="white">
            <i
              @click="onBack()"
              class="iconfont icon-return"/>
            <v-spacer/>
          </v-toolbar>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss'>
</style>

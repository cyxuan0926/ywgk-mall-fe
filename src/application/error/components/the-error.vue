<template>
  <div class="errors">
    <v-container
      fluid>
      <the-error-header/>
      <transition
        name="router-fade"
        mode="out-in">
        <router-view/>
      </transition>
    </v-container>
  </div>
</template>

<script>
import TheErrorHeader from './the-error-header';
export default {
  components: {
    'the-error-header': TheErrorHeader
  }
};
</script>

<style lang="scss" scoped>
.errors {
  width: 100%;
  background: #fff;
  height: 100vh;
}
</style>

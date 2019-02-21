<template>
  <div class="main">
    <transition
      name="router-fade"
      mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  background: #f9f8fe;
}
</style>

<template>
  <div
    class="chips">
    <v-layout
      row>
      <v-flex
        xs12>
        <div class="chip-message">
          <v-chip
            v-if="show"
            color="#000000"
            text-color="#ffffff">{{ chipOptions }}</v-chip>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      chipOptions: ''
    };
  },
  methods: {
    closeModel() {
      this.show = false;
    },
    showModel() {
      this.show = true;
      let that = this;
      setTimeout(() => {
        that.closeModel();
      }, 1500);
    }
  }
};

</script>

<style lang="scss" scoped>
.chips {
  position: absolute;
  top: 74%;
  z-index: 5000;
  width: 100%;
}
.chip-message {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="server-error">
    <v-layout
      class="error--message"
      row
      wrap>
      <v-flex
        xs12>
        <div
          class="error-image">
          <img
            :src="image"
            alt="">
        </div>
      </v-flex>
      <v-flex
        xs12>
        <div
          class="error-text">
          {{ message }}
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      row>
      <v-flex
        xs12>
        <div
          class="error-back">
          <v-btn
            round
            outline
            color="indigo"
            @click="onBack">{{ button }}</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import Image from '@/assets/images/500.png';

export default {
  data() {
    return {
      image: Image,
      message: `哎呀~出错了！
      请检查您的网络~
      `,
      button: '返回主页'
    };
  },
  created() {
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    onBack() {
      this.$router.push(`/home`);
    }
  }
};
</script>
<style lang="scss" scoped>
.error--message {
  width: 100%;
}
.error-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 140px;
}
.error-text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  color: #666666;
  font-size: 14px;
}
.error-back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  font-size: 12px;
}
</style>

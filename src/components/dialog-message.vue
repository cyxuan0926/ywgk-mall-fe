<template>
  <div
    class="message">
    <v-layout
      row>
      <v-flex
        xs12>
        <v-dialog
          v-model="show"
          persistent
          attach="true"
          max-width="290">
          <v-card>
            <v-card-text class="text-xs-center">{{ confirmModalOptions.textMessage }}</v-card-text>
            <v-card-actions>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="onClose()">取消</v-btn>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="onConfirm()">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  props: {
    confirmModalOptions: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
  },
  methods: {
    closeModel: function() {
      this.show = false;
    },
    showModel: function() {
      this.show = true;
    },
    onClose() {
      this.show = false;
    },
    onConfirm() {
      this.show = true;
      this.$parent.onConfirm();
    }
  }
};

</script>

<style lang="scss" scoped>
</style>

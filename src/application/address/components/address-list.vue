<template>
  <div class="address-receiving">
    <v-container
      fluid
      class="container">
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
              <span class="header-title">收货地址</span>
              <v-spacer/>
              <div>
                <span @click="onManagement()">管理</span>
              </div>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="items"
        row>
        <v-flex xs12>
          <div
            class="list-items">
            <v-list two-line>
              <template v-for="(address,index) in allAddresses">
                <v-list-tile
                  :key="address.id"
                  class="list-item">
                  <v-list-tile-content
                    @click="onSelected(address)"
                    class="list-item__content">
                    <v-list-tile-title class="list-item__content-name">{{ address.consignee }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary list-item__content-address">
                      <span
                        v-if="address.isDefault"
                        class="list-item__content-default">[默认地址]</span>
                      <span>
                        {{ address.provinceName }}&nbsp;{{ address.cityName }}&nbsp;{{ address.countyName }}&nbsp;{{ address.streetDetail }}
                      </span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="index"/>
              </template>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="btn-save"
        row>
        <v-flex
          xs12>
          <div
            class="btn-save__item">
            <v-btn
              @click="onNew()"
              block
              color="blue"
              dark>添加新地址</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      hasChildren: false,
      tile: false
    };
  },

  computed: {
    ...mapState({
      allAddresses: state => state.address.allAddresses
    })
  },
  created() {
    this.getAllAddresses();
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getAllAddresses']),
    ...mapMutations(['setSelectedAddress', 'setAddressEntryId']),
    onBack() {
      this.$router.push(`/order`);
    },
    onNew() {
      this.$router.push(`/address/add`);
      this.setAddressEntryId(1);
    },
    onSelected(selectedAddress) {
      this.setSelectedAddress(selectedAddress);
      this.$router.push(`/order`);
    },
    onManagement() {
      this.$router.push(`/address/management`);
      this.setAddressEntryId(1);
    }
  }
};

</script>

<style lang="scss" scoped>
.items {
  margin-top: 10px;
}
.list-items {
  margin-bottom: 100px;
  .list {
    background: none;
  }
}
.list-item {
  margin-top: 10px;
  padding: 0 15px;
  background: #ffffff;
  &__content {
    &-name {
      font-size: 13px;
    }
    &-address {
      font-size: 12px;
      word-break: break-all;
      white-space: normal;
    }
    &-default {
      color: #0000ff;
    }
  }
}
.btn-save {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: inline-block;
  background: #f9f8fe;
  &__item {
    padding: 0 15px;
  }
}
</style>

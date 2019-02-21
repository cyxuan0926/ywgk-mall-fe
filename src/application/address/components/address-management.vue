<template>
  <div class="address-management">
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
              <span class="header-title">管理收货地址</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex xs12>
          <div
            class="list-items">
            <v-list
              two-line>
              <template v-for="(address,index) in allAddresses">
                <v-list-tile
                  :key="address.id"
                  class="list-item"
                  avatar
                  ripple>
                  <v-list-tile-content class="list-item__content">
                    <v-list-tile-title class="list-item__content-name">{{ address.consignee }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary list-item__content-address">
                      <span
                        class="list-item__content-default"
                        v-if="address.isDefault">
                        [默认地址]
                      </span>
                      {{ address.provinceName }}&nbsp;{{ address.cityName }}&nbsp;{{ address.countyName }}&nbsp;{{ address.streetDetail }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  :key="index"/>
                <div
                  class="list-item__actions"
                  :key="address.id+index">
                  <div class="list-item__action">
                    <span @click="onEdit(address.id)"><i class="iconfont icon-bianji"/>编辑</span>&nbsp;&nbsp;&nbsp;<span @click="onDelete(address.id)"><i class="iconfont icon-trash"/>删除</span>
                  </div>
                </div>
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
          <div class="btn-save__item">
            <v-btn
              block
              color="blue"
              @click="onNew()"
              dark>添加新地址</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <dialog-model
            :confirm-modal-options="confirmOptions"
            ref="myConfirm"/>
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
      addressId: '',
      confirmOptions: {}
    };
  },
  computed: {
    ...mapState({
      allAddresses: state => state.address.allAddresses,
      AddressEntryId: state => state.address.AddressEntryId
    })
  },
  created() {
    this.search();
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getAllAddresses', 'deleteAddress']),
    ...mapMutations(['setAddressEntryId']),
    onBack() {
      if (this.AddressEntryId === 0) {
        this.$router.push(`/personal/center`);
      } else {
        this.$router.push(`/address/list`);
      }
    },
    onNew() {
      if (this.AddressEntryId === 0) {
        this.$router.push(`/address/add`);
        this.setAddressEntryId(0);
      }
      if (this.AddressEntryId === 1) {
        this.$router.push(`/address/add`);
        this.setAddressEntryId(1);
      }
    },
    onEdit(id) {
      if (this.AddressEntryId === 0) {
        this.$router.push(`/address/edit/${id}`);
        this.setAddressEntryId(0);
      }
      if (this.AddressEntryId === 1) {
        this.$router.push(`/address/edit/${id}`);
        this.setAddressEntryId(1);
      }
    },
    onConfirm() {
      this.deleteAddress(this.addressId).then(() => {
        this.search();
        this.$refs.myConfirm.closeModel();
      });
    },
    onDelete(id) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '确定删除?'};
      this.addressId = id;
    },
    search() {
      this.getAllAddresses();
    }
  }
};

</script>

<style lang="scss" scoped>
.list-items {
  margin-bottom: 100px;
  .v-list {
    background: none;
  }
}
.list-item {
  margin-top: 10px;
  padding: 0 15px;
  background: #ffffff;
  &__actions {
    flex-direction: row;
    justify-content: flex-end;
    display: flex;
    background: #ffffff;
    padding-right: 15px;
  }
  &__action {
    font-size: 12px;
  }
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

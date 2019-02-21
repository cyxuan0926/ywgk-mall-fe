<template>
  <div class="personal-center">
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
              <span class="header-title">个人中心</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div
            class="banner">
            <img
              class="banner__image"
              src="@/assets/images/home-image/banner2x.png">
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="list-actions">
            <div
              class="list__action">
              <v-list>
                <v-list-tile @click="onView()">
                  <v-list-tile-content class="list__action-content">
                    <v-list-tile-title>我的收货地址</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="list__action-enter">
                    查看更多地址&nbsp;&nbsp;
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider/>
              </v-list>
            </div>
            <div
              v-if="defaultAddress.consignee!==undefined"
              class="information">
              <div class="information__name">{{ defaultAddress.consignee }}</div>
              <div class="text--primary information__address">
                <span class="information__address-default">[默认地址]</span>
                <span>
                  {{ defaultAddress.provinceName }}&nbsp;{{ defaultAddress.cityName }}&nbsp;{{ defaultAddress.countyName }}&nbsp;{{ defaultAddress.streetDetail }}
                </span>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      defaultAddress: {}
    };
  },
  computed: {
    ...mapState({
      addressDefault: state => state.address.addressDefault
    })
  },
  created() {
    this.getAddressDefault()
      .then(() => {
        this.defaultAddress = _.cloneDeep(this.addressDefault);
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.defaultAddress = [];
        }
      });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getAddressDefault']),
    ...mapMutations(['setAddressEntryId']),
    onBack() {
      this.$router.push(`/home`);
      this.setAddressEntryId('');
    },
    onView() {
      this.$router.push(`/address/management`);
      this.setAddressEntryId(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  &__image {
    width: 100%;
  }
}
.list-actions {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #dddddd;
  background-color: #ffffff;
  padding-bottom: 10px;
}
.list__action {
  padding: 0 10px;
  &-content {
    font-size: 12px;
  }
  &-enter {
    flex-direction: row;
    align-items: center;
    color: #dddddd;
    font-size: 12px;
  }
}
.information {
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  margin-top: 15px;
  background-color: #f3f3f3;
  border-radius: 3px;
  min-height: 52px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.information__address {
  word-break: break-all;
  white-space: normal;
}
.information__address-default {
  color: #0000ff;
}
</style>

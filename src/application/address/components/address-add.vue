<template>
  <div class="address-add">
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
              <span class="header-title">新增收货地址</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="address-items"
        row>
        <v-flex
          xs12>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-text-field
                  v-model="address.consignee"
                  placeholder="请输入收货人姓名"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-select
                  v-model="address.countryCode"
                  disabled
                  placeholder="中国"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-select
                  :items="addressProvinces"
                  v-model="addressProvinceCode"
                  placeholder="请选择省"
                  no-data-text='暂无数据'
                  item-text="name"
                  item-value="code"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-select
                  :items="addressCities"
                  v-model="addressCityCode"
                  placeholder="请选择市"
                  no-data-text='暂无数据'
                  item-text="name"
                  item-value="code"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-select
                  :items="addressCounties"
                  v-model="addressCountyCode"
                  placeholder="请选择县"
                  no-data-text='暂无数据'
                  item-text="name"
                  item-value="code"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item">
                <v-text-field
                  v-model="addressStreetDetail"
                  rows="3"
                  placeholder="请输入地址"/>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="address-item address-item--switch">
                <div class="address-item__default">
                  <span>
                    设置默认地址
                  </span>
                </div>
                <v-switch
                  class="switch"
                  color="green"
                  hide-details
                  v-model="address.isDefault"/>
              </div>
            </v-flex>
          </v-layout>
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
              block
              color="blue"
              :disabled="saving"
              @click="onSave()"
              dark>保存</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';

export default {

  data() {
    return {
      chinaCountryCode: '86',
      address: { consignee: '', isDefault: false },
      addressProvinceCode: '',
      addressCityCode: '',
      addressCountyCode: '',
      addressStreetDetail: '',
      addressProvinces: [],
      addressCities: [],
      addressCounties: [],
      saving: false
    };
  },
  watch: {
    address: {
      handler: _.debounce(function(address) {
        this.replaceAddress(address);
      }),
      deep: true
    },
    addressProvinceCode: {
      handler: _.debounce(function(provinceCode) {
        this.addressCityCode = '';
        const province = this.filterProvince(provinceCode);
        this.address.provinceCode = provinceCode;
        this.address.provinceName = province.name;
        this.address.cityCode = null;
        this.address.cityName = null;
        this.address.countyCode = null;
        this.address.countyName = null;
        this.getCitiesBy(provinceCode).then(() => {
          this.addressCities = this.filterCities(provinceCode);
        });
        this.replaceAddress(this.address);
      })
    },
    addressCityCode: {
      handler: _.debounce(function(addressCityCode) {
        this.addressCountyCode = '';
        this.addressCounties = [];
        if (addressCityCode) {
          const city = this.filterCity(addressCityCode);
          this.address.cityCode = addressCityCode;
          this.address.cityName = city.name;
          this.address.countyCode = null;
          this.address.countyName = null;
          this.getCountiesBy(addressCityCode).then(() => {
            this.addressCounties = this.filterCounties(addressCityCode);
          });
          this.replaceAddress(this.address);
        }
      })
    },
    addressCountyCode: {
      handler: _.debounce(function(addressCountyCode) {
        if (addressCountyCode) {
          const county = this.filterCounty(addressCountyCode);
          this.address.countyCode = addressCountyCode;
          this.address.countyName = county.name;
          this.replaceAddress(this.address);
        }
      })
    },
    addressStreetDetail: {
      handler: _.debounce(function(addressStreetDetail) {
        this.address.streetDetail = addressStreetDetail.replace(/\s+/g, '');
        this.replaceAddress(this.address);
      })
    }
  },
  computed: {
    ...mapGetters([
      'filterCountry',
      'filterProvince',
      'filterProvinces',
      'filterCity',
      'filterCities',
      'filterCounty',
      'filterCounties'
    ]),
    ...mapState({
      AddressEntryId: state => state.address.AddressEntryId
    })
  },
  created() {
    Promise.all([this.getAllCountries(), this.getProvincesBy(this.chinaCountryCode)]).then(() => {
      this.addressProvinces = this.filterProvinces(this.chinaCountryCode);
      const country = this.filterCountry(this.chinaCountryCode);
      this.address.countryCode = country.code;
      this.address.countryName = country.name;
    });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapMutations(['replaceAddress', 'setSelectedAddress', 'setAddressEntryId']),
    ...mapActions(['getAllCountries', 'getProvincesBy', 'getCitiesBy', 'getCountiesBy', 'addAddress']),
    onBack() {
      if (this.AddressEntryId === 0) {
        this.$router.push(`/address/management`);
        this.setAddressEntryId(0);
      }
      if (this.AddressEntryId === 1) {
        this.$router.push(`/address/management`);
        this.setAddressEntryId(1);
      }
    },
    onSave() {
      if (this.address.consignee === '') {
        this.$chip({
          chipOptions: '姓名不能为空'
        });
        return;
      }
      if (this.address.countryCode === '') {
        this.$chip({
          chipOptions: '国家不能为空'
        });
        return;
      }
      if (this.addressProvinceCode === '') {
        this.$chip({
          chipOptions: '省不能为空'
        });
        return;
      }
      if (this.addressCityCode === '') {
        this.$chip({
          chipOptions: '市不能为空'
        });
        return;
      }
      if (this.addressCountyCode === '') {
        this.$chip({
          chipOptions: '县不能为空'
        });
        return;
      }
      if (this.addressStreetDetail === '') {
        this.$chip({
          chipOptions: '地址不能为空'
        });
        return;
      }
      this.saving = true;
      if (this.AddressEntryId === 0) {
        this.addAddress().then(res => {
          this.saving = false;
          this.$router.push(`/address/management`);
          this.setAddressEntryId(0);
        }).catch(() => {
          this.saving = false;
        });
      } else {
        this.addAddress().then(res => {
          this.saving = false;
          this.setSelectedAddress(res);
          this.$router.push(`/order`);
          this.setAddressEntryId(1);
        }).catch(() => {
          this.saving = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.address-add {
  background: #fff;
}
.address-add {
  height: 100%;
  .container {
    height: 100%;
  }
}
.address-items {
  padding: 0 15px;
  margin-top: 10px;
  background: #ffffff;
}
.address-item {
  &__default {
    font-size: 12px;
    color: #333333;
  }
  &--switch {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .v-input--switch {
      flex: 0;
    }
  }
}
.btn-save {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: block;
  left: 0;
  &__item {
    padding: 0 15px;
  }
}
</style>

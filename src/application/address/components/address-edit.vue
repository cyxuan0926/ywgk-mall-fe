<template>
  <div class="address-edit">
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
              <span class="header-title">编辑收货地址</span>
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
      address: { address: {} },
      addressProvinceCode: 'default',
      addressCityCode: 'default',
      addressCountyCode: 'default',
      addressStreetDetail: '',
      addressProvinces: [],
      addressCities: [],
      addressCounties: [],
      saving: false
    };
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
  watch: {
    address: {
      handler: _.debounce(function(address) {
        this.replaceAddress(address);
      }),
      deep: true
    },
    addressProvinceCode: {
      handler: _.debounce(function(provinceCode, oldProvinceCode) {
        if (oldProvinceCode !== 'default') {
          this.addressCityCode = null;
        }
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
      handler: _.debounce(function(addressCityCode, oldAddressCityCode) {
        if (oldAddressCityCode !== 'default') {
          this.addressCountyCode = null;
        }
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
  created() {
    Promise.all([
      this.getAddress(this.$route.params.id),
      this.getAllCountries(),
      this.getProvincesBy(this.chinaCountryCode)
    ]).then(() => {
      this.address = _.cloneDeep(this.$store.state.address.address);
      this.addressProvinces = this.filterProvinces(this.chinaCountryCode);
      this.addressProvinceCode = this.address.provinceCode;
      this.addressCityCode = this.address.cityCode;
      this.addressCountyCode = this.address.countyCode;
      this.addressStreetDetail = this.address.streetDetail;
    });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapMutations(['replaceAddress', 'setAddressEntryId']),
    ...mapActions(['getAllCountries', 'getProvincesBy', 'getCitiesBy', 'getCountiesBy', 'getAddress', 'updateAddress']),
    onBack() {
      this.$router.push(`/address/management`);
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
      if (this.addressProvinceCode === null) {
        this.$chip({
          chipOptions: '省不能为空'
        });
        return;
      }
      if (this.addressCityCode === null) {
        this.$chip({
          chipOptions: '市不能为空'
        });
        return;
      }
      if (this.addressCountyCode === null) {
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
      this.updateAddress()
        .then(() => {
          if (this.AddressEntryId === 0) {
            this.$router.push(`/address/management`);
            this.setAddressEntryId(0);
          } else {
            this.$router.push(`/address/management`);
            this.setAddressEntryId(1);
          }
        })
        .catch(() => {
          this.saving = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.address-edit {
  height: 100%;
  background: #fff;
}
.address-items {
  padding: 0 15px;
  background: #ffffff;
  margin-top: 10px;
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
  left: 0;
  display: block;
  &__item {
    padding: 0 20px;
  }
}
</style>

<template>
  <div class="category-product-detail">
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
              <span class="header-title">商品详情</span>
              <v-spacer/>
              <router-link
                to='/cart'>
                <div class="icon">
                  <i class="iconfont icon-gouwuche"/>
                  <span
                    v-if="count"
                    class="icon-number">{{ count }}</span>
                </div>
              </router-link>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-flex
          xs12>
          <div
            class="banner">
            <img
              class="banner__image"
              :src="mainPictrueUrl[0]">
          </div>
        </v-flex>
        <v-flex
          xs12>
          <div class="texts">
            <div
              class="text__border"/>
            <div
              class="text__title">
              <div>{{ productDetail.name }}</div>
              <div class="text__title-price">{{ productDetail.price | money }}</div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="choose-specifications">
            <v-list>
              <v-list-tile
                @click="open()">
                <v-list-tile-content>
                  <v-list-tile-title>选择规格</v-list-tile-title>
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-action>
                  <i class="iconfont icon-enter"/>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="details"
        row
        wrap>
        <v-flex
          xs12>
          <div class="detail-text">
            <div class="detail-text__title">
              商品详情
            </div>
            <div class="detail-text__tags">
              <img src="@/assets/images/product-detail/left.png">
              <span>COMMODITES DETALLS</span>
              <span class="detail-text__tags-underline"/>
              <img src="@/assets/images/product-detail/right.png">
            </div>
          </div>
        </v-flex>
        <v-flex
          xs12>
          <div class="detail-images">
            <template v-for="(image,index) in pictrueUrl">
              <img
                v-if="image!==productDetail.mainPictureThumb"
                :key="index"
                :src="image">
            </template>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="detail-footer"
        row>
        <v-flex
          xs12>
          <div class="detail-footer__join">
            <span class="detail-footer__join-price">{{ productDetail.price | money }}</span>
            <span
              class="detail-footer__join-join"
              @click="onAddcart(productDetail)">加入购物车</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <v-bottom-sheet
            v-model="sheet">
            <div
              class="bottom-sheet-card"
              style="height:100%">
              <div
                style="height:100%"
                class="card-detail">
                <div class="card-detail__close">
                  <i
                    class="iconfont icon-roundclose"
                    @click="sheet=false"/>
                </div>
                <div class="card-detail__primary">
                  <div class="card-detail__image">
                    <img
                      :src="productDetail.mainPictureThumb">
                  </div>
                  <v-card-text>
                    <div class="card-detail__text">
                      <div class="text-xs-center">{{ productDetail.name }}</div>
                      <div class="text-xs-center card-detail__price">{{ productDetail.price * quantity | money }}</div>
                    </div>
                  </v-card-text>
                </div>
                <div class="card-detail__toggle">
                  <template v-for="(attributes,attribute) in details">
                    <div
                      :key="attribute"
                      class="card-detail__toggle-btn">
                      {{ attributes.name }}
                      <div class="card-detail__actions">
                        <template v-for="(value,index) in attributes.values">
                          <v-btn-toggle
                            v-model="attributes.toggle"
                            :key="index">
                            <v-btn
                              class="card-detail__properties-button"
                              @click="onSelect(attributes,index)"
                              small
                              outline
                              round
                              :input-value="value.checked"
                              :value="value.name ">{{ value.name }}</v-btn>
                          </v-btn-toggle>
                        </template>
                        <div v-if="refresh"/>
                      </div>
                    </div>
                  </template>
                  <div class="card-detail__count">
                    <div>
                      购物车数量
                    </div>
                    <div class="card-detail__count-number">
                      <i
                        class="iconfont icon-jianhao"
                        @click="minus()"/>&nbsp;
                      <v-text-field
                        v-model="quantity"
                        type="number"
                        disabled
                        single-line
                        outline/>
                      <i v-if="refresh"/>
                      &nbsp;
                      <i
                        class="iconfont icon-jiahao1"
                        @click="add()"/>
                    </div>
                  </div>
                </div>
                <div
                  class="btn__join">
                  <v-btn
                    block
                    color="blue"
                    @click="onJoin()"
                    dark>加入购物车</v-btn>
                </div>
              </div>
            </div>
          </v-bottom-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      sheet: false,
      pictrueUrl: [],
      mainPictrueUrl: [],
      details: [],
      refresh: false,
      productAttributes: [],
      currentObject: {},
      quantity: 1
    };
  },
  computed: {
    ...mapState({
      productDetail: state => state.product.productDetail,
      categoryId: state => state.product.categoryId,
      searchValue: state => state.home.searchValue,
      count: state => state.shoppingCart.count
    })
  },
  created() {
    this.getProductDetail(this.$route.params.id).then(() => {
      this.productDetail.pictures.forEach(obj => {
        if (!obj.main) {
          this.getFile(obj.fileId)
            .then(response => {
              this.pictrueUrl.push(URL.createObjectURL(response.data));
            })
            .catch(() => {
            });
        } else {
          this.getFile(obj.fileId)
            .then(response => {
              this.mainPictrueUrl.push(URL.createObjectURL(response.data));
            })
            .catch(() => {});
        }
      });
      this.productDetail.attributes.forEach(obj => {
        obj.variable = '';
        obj.toggle = '';
        obj.values.forEach(values => {
          values.checked = false;
        });
        this.details.push(obj);
      });
    });
    this.getCartItemsNumber();
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getProductDetail', 'getFile', 'addCart', 'getCartItemsNumber']),
    onBack() {
      if (this.categoryId !== null && this.categoryId !== undefined) {
        this.$router.push(`/product/list/${this.categoryId}`);
      } else {
        if (this.searchValue === null || this.searchValue === undefined) {
          if (this.categoryId === undefined) {
            this.$router.push(`/home`);
          }
        } else {
          this.$router.push(`/product/list/0`);
        }
        if (this.categoryId === null) {
          this.$router.push(`/home`);
        }
      }
    },
    onAddcart(productDetail) {
      if (this.productDetail.attributes.length === 0) {
        this.onJoin();
        this.$chip({
          chipOptions: '加入购物车成功'
        });
        this.getCartItemsNumber();
      } else {
        this.open();
      }
    },
    onJoin() {
      if (this.productDetail.attributes.length > 0) {
        for (let i = 0; i < this.details.length; i++) {
          if (this.details[i].toggle === null || this.details[i].toggle === '') {
            this.$chip({
              chipOptions: '请选择商品属性'
            });
            return;
          } else {
            this.productAttributes.push({'productId': this.details[i].id, 'name': this.details[i].name, 'value': this.details[i].toggle});
          }
        }
      }
      this.addCart({productId: this.$route.params.id, quantity: this.quantity, productAttributes: this.productAttributes}).then(() => {
        this.sheet = false;
        this.$chip({
          chipOptions: '加入购物车成功'
        });
        this.getCartItemsNumber();
        this.productAttributes.length = 0;
        this.details.forEach(obj => {
          obj.toggle = null;
          obj.values.forEach(obj1 => {
            obj1.checked = false;
          });
        });
      });
    },
    open() {
      this.sheet = true;
    },
    onSelect(attributes, index) {
      this.details.forEach(obj => {
        if (JSON.stringify(obj) === JSON.stringify(attributes)) {
          obj.values.forEach((values, key) => {
            if (index === key) {
              values.checked = true;
              obj.values.forEach((values, key) => {
                if (key !== index) {
                  values.checked = false;
                }
              });
            }
          });
        }
      });
      this.refresh = !this.refresh;
    },
    add() {
      this.quantity++;
    },
    minus() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.icon-roundclose {
  font-size: 22px;
}
.banner {
  &__image {
    width: 100%;
  }
}
.texts {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 1;
}
.text {
  &__border {
    border: 1px solid #dddddd;
    margin: 0 20px;
    height: 45px;
    z-index: 10;
  }
  &__title {
    background: #ffffff;
    border: 1px solid #dddddd;
    height: 60px;
    margin: 0 30px;
    position: relative;
    z-index: 100;
    top: -70px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-price {
      color: #ff0000;
    }
  }
}
.choose-specifications {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  padding: 0 15px;
  .list {
    padding: 0;
  }
}
.detail {
  margin-top: 20px;
}
.detail-text {
  padding: 8px 15px;
  &__tags-underline {
    border-bottom: 1px solid #dddddd;
    width: 36%;
    display: inline-block;
  }
}
.detail-images {
  margin-top: 10px;
  margin-bottom: 55px;
  > img {
    width: 100%;
  }
}
.detail-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #ffffff;
  &__join {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    border-top: 1px solid #dddddd;
    &-price {
      font-size: 16px;
      color: #264c90;
    }
    &-join {
      font-size: 16px;
      color: #264c90;
    }
  }
}
.card-detail {
  height: 100%;
  &__image {
    width: 182px;
    > img {
      width: 100%;
      max-height: 182px;
    }
  }
  &__close {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
  }
  &__primary {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__price {
    color: #ff0000;
  }
  &__toggle {
    overflow-y: scroll;
    height: 32%;
    padding: 0 15px;
    margin-bottom: 10px;
    &-btn {
      margin-top: 15px;
      background: #ffffff;
    }
  }
  &__properties-button {
    height: 20px;
    opacity: 1;
    padding: 0;
    min-width: 40px;
    border-radius: 8px !important;
    border: 1px solid #dddddd;
  }
  &__count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 10px;
    &-number {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80px;
    }
  }
}
.btn__join {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
}
</style>

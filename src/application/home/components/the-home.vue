<template>
  <div class="home">
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
              <span class="header-title">电子商务</span>
              <v-spacer/>
              <router-link
                to='/cart'>
                <div class="icon">
                  <i class="iconfont icon-gouwuche"/>
                  <span
                    v-if="count>0"
                    class="icon-number">{{ count }}</span>
                </div>
              </router-link>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
        class="category-options">
        <v-flex
          xs12>
          <v-layout
            row>
            <v-flex
              xs12>
              <div
                class="search">
                <div
                  class="search__name">
                  <v-icon
                    class="search-icon">search</v-icon>
                </div>
                <v-text-field
                  v-model="value"
                  @keyup.enter="onSearch()"
                  single-line
                  outline
                  label="请输入商品名称"/>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          xs12>
          <div
            class="banner">
            <img
              class="banner__image"
              src="@/assets/images/home-image/banner2x.png">
          </div>
        </v-flex>
        <v-flex
          xs12>
          <v-layout
            row
            justify-space-around
            class="tabs-actions">
            <v-flex
              xs4>
              <router-link
                to='/my/order'>
                <div
                  class="tabs-action">
                  <img
                    class="tabs-action__image"
                    src="@/assets/images/home-image/order.png"
                    alt="">
                  <span class="tabs-action__text">我的订单</span>
                </div>
              </router-link>
            </v-flex>
            <v-flex
              xs4>
              <router-link
                to="/category/0">
                <div
                  class="tabs-action">
                  <img
                    class="tabs-action__image"
                    src="@/assets/images/home-image/category.png"
                    alt="">
                  <span class="tabs-action__text">商品分类</span>
                </div>
              </router-link>
            </v-flex>
            <v-flex
              xs4>
              <router-link
                to="/personal/center">
                <div
                  class="tabs-action">
                  <img
                    class="tabs-action__image"
                    src="@/assets/images/home-image/personalCenter.png"
                    alt="">
                  <span class="tabs-action__text">个人中心</span>
                </div>
              </router-link>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout
        row
        class="items"
        wrap>
        <v-flex xs12>
          <v-layout row>
            <v-flex
              xs12>
              <div
                class="popularity">
                <img
                  src="@/assets/images/home-image/decorate-left2x.png">
                <span class="popularity__title">人气推荐</span>
                <img
                  src="@/assets/images/home-image/decorate2x.png">
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout
            row
            wrap>
            <template v-for="(product,index) in popularityProduct">
              <v-flex
                :key="index"
                xs4>
                <div
                  @click="onDetail(product)"
                  class="item">
                  <div class="item-image">
                    <img :src="product.mainPictureThumb">
                  </div>
                  <div class="item-content">
                    <div class="item-content__name">{{ product.name }}</div>
                    <div class="item-content__price">{{ product.price | money }}</div>
                  </div>
                </div>
              </v-flex>
            </template>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <chip
            :chip-options="chipOptions"
            ref="myChip"/>
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
      value: '',
      popularityProduct: [],
      chipOptions: {}
    };
  },
  watch: {
    value: function(nowValue) {
      if (nowValue !== null) {
        this.setHomeSearch(nowValue.replace(/\s+/g, ''));
      }
    }
  },
  computed: {
    ...mapState({
      searchValue: state => state.home.searchValue,
      products: state => state.product.products,
      count: state => state.shoppingCart.count
    })
  },
  created() {
    this.getCartItemsNumber();
    this.getProducts({page: 0, size: 6}).then(() => {
      this.popularityProduct = this.products.content;
    });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getProducts', 'getCartItemsNumber']),
    ...mapMutations(['setHomeSearch']),
    onBack() {
      window.JSInterface.exit();
    },
    onSearch() {
      if (this.value !== '' && this.value !== null) {
        this.value = this.value.replace(/\s+/g, '');
        if (this.value) {
          this.$router.push('/product/list/0');
        } else {
          this.$chip({
            chipOptions: '请输入有效的字符'
          });
        }
      } else {
        this.$chip({
          chipOptions: '请输入搜索内容'
        });
      }
    },
    onDetail(product) {
      this.$router.push(`/product/detail/${product.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.category-option {
  background: #fff;
}
.search {
  padding: 15px 15px;
  background: #ffffff;
  &__name {
    position: relative;
  }
}
.search-icon {
  z-index: 1;
  position: absolute;
  top: 7px;
  left: 0%;
}
.banner {
  &__image {
    width: 100%;
  }
}
.tabs-actions {
  padding: 15px 0 25px 0;
}
.tabs-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__image {
    width: 34px;
    height: 34px;
  }
  &__text {
    font-size: 12px;
    color: #666;
  }
}
.items {
  margin-top: 10px;
  background: #fff;
}
.popularity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  &__title {
    font-size: 16px;
  }
}
.item {
  margin: 0 5px;
  box-shadow: 5px 5px 10px #dddddd;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 10px;
  min-width: 96px;
  &-image {
    min-height: 90px;
    max-height: 90px;
    > img {
      width: 100%;
      max-height: 90px;
    }
  }
  &-content {
    font-size: 12px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 45px;
    &__name {
      white-space: nowrap;
      overflow: hidden;
      max-width: 84px;
    }
    &__price {
      color: #ff0000;
    }
  }
}
</style>

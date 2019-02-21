<template>
  <div class="product-list">
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
              <v-layout
                row
                class="search">
                <v-flex
                  xs12>
                  <div class="search__name">
                    <v-icon
                      class="search-icon">search</v-icon>
                    <v-text-field
                      v-model="name"
                      @keyup.enter="onSearch()"
                      single-line
                      outline
                      label="请输入商品名称"/>
                  </div>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="!isEmpty"
        row>
        <v-flex
          xs12>
          <div
            id="scroll-target"
            style="max-height: 800px"
            class="scroll-y">
            <div
              v-scroll:#scroll-target="onScroll"
              class="product-list">
              <v-list
                two-line>
                <template v-for="(product,index) in products">
                  <v-list-tile
                    @click="onSelect(product.id)"
                    class="product-list__tile-item"
                    :key="index">
                    <div
                      class="product-list__image">
                      <img
                        v-if="product.mainPictureThumb"
                        :src="product.mainPictureThumb">
                      <img
                        v-else
                        src="@/assets/images/no.png">
                    </div>
                    <v-list-tile-content
                      class="product-list__content">
                      <v-list-tile-title
                        class="product-list__content-name">{{ product.name }}</v-list-tile-title>
                      <v-list-tile-title
                        class="product-list__content-price">￥{{ product.price }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </div>
          </div>
          <div
            class="data-loaded"
            v-if="warmPrompt">
            数据加载完啦
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="isEmpty"
        row>
        <v-flex
          xs12>
          <div class="warm-prompt">
            暂无相关商品,请换一个试试！
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
      name: '',
      offsetTop: 0,
      scrollHeight: 0,
      page: 0,
      size: 12,
      products: [],
      warmPrompt: false,
      isEmpty: false
    };
  },
  watch: {},
  computed: {
    ...mapState({
      productList: state => state.product.products,
      searchValue: state => state.home.searchValue,
      categoryId: state => state.product.categoryId
    })
  },
  created() {
    this.setCategoryId(this.$route.params.id === '0' ? null : this.$route.params.id);
    this.getProducts({categoryId: this.$route.params.id === '0' ? null : this.$route.params.id, name: this.searchValue === null ? null : this.searchValue, page: this.page, size: this.size}).then(() => {
      this.products = this.productList.content;
      if (this.products.length === 0) {
        this.isEmpty = true;
      }
    });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getProducts']),
    ...mapMutations(['setHomeSearch', 'setCategoryId']),
    onBack() {
      if (this.categoryId !== null && this.categoryId !== undefined) {
        this.$router.push(`/category/0`);
        this.setCategoryId(null);
        this.setHomeSearch(null);
      } else {
        this.$router.push(`/home`);
        this.setCategoryId(null);
        this.setHomeSearch(null);
      }
    },
    onSelect(productId) {
      this.$router.push(`/product/detail/${productId}`);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
      let scale = (e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop) / e.target.clientHeight;
      if (scale === 0) {
        this.page++;
        this.getProducts({ categoryId: this.$route.params.id === '0' ? null : this.$route.params.id, name: this.searchValue === null ? null : this.searchValue, page: this.page, size: this.size }).then(() => {
          this.productList.content.forEach(obj => {
            this.products.push(obj);
          });
          if (this.productList.content.length === 0) {
            this.warmPrompt = true;
          }
        });
      }
    },
    onSearch() {
      if (this.name !== '' && this.name !== null) {
        this.name = this.name.replace(/\s+/g, '');
        if (this.name) {
          this.getProducts({ categoryId: this.$route.params.id === '0' ? null : this.$route.params.id, name: this.name, page: this.page, size: this.size }).then(() => {
            this.products = this.productList.content;
            if (this.products.length === 0) {
              this.isEmpty = true;
            }
          });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.category-product-list {
  background: #ffffff;
}
.search {
  margin-left: 15px;
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
.warm-prompt {
  display: flex;
  justify-content: center;
}
.product-list {
  .list {
    padding: 0;
  }
  &__tile--item {
    margin: 8px 0;
    border-bottom: 1px solid #dddddd;
  }
  &__image {
    height: 72px;
    width: 90px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    > img {
      width: 100%;
      max-height: 70px;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
    &-name {
      margin-left: 15px;
      font-size: 12px;
    }
    &-price {
      margin-left: 15px;
      color: #ff0000;
      font-size: 12px;
    }
  }
}
.data-loaded {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="category">
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
              <span class="header-title">商品分类</span>
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
        wrap>
        <v-flex
          xs12>
          <div
            class="category-list">
            <v-list two-line>
              <template
                v-for="(item,index) in categories">
                <v-list-tile
                  :key="index"
                  avatar
                  ripple
                  class="category-list__item"
                  @click="onSelect(item)">
                  <v-list-tile-content>
                    <v-list-tile-title class="category-list__name">{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider
                  v-if="index < categories.length"
                  :key="`divider-${index}`"/>
              </template>
            </v-list>
          </div>
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
      hasChildren: false
    };
  },
  watch: {
    '$route'(to, from) {
      if (to.fullPath === '/category/0') {
        this.getCategories();
      } else {
        this.getCategoriesId(this.$route.params.id).then(() => {
          this.$router.push(`/category/${this.$route.params.id}`);
        });
      }
    }
  },
  computed: {
    ...mapState({
      categories: state => state.category.categories,
      count: state => state.shoppingCart.count
    })
  },
  created() {
    this.getCategories();
    this.getCartItemsNumber();
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getCategories', 'getCategoriesId', 'getCartItemsNumber']),
    onBack() {
      this.$router.push(`/home`);
    },
    onSelect(item) {
      if (item.hasChildren) {
        this.getCategoriesId(item.id).then(() => {
          this.$router.push(`/category/${item.id}`);
        });
      } else {
        this.$router.push(`/product/list/${item.id}`);
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.category {
  background-color: #fff;
}
.icon-jinruyou {
  font-size: 12px;
}
.category-list {
  padding: 0 15px;
}
.category-list__name {
  font-size: 12px;
}
</style>

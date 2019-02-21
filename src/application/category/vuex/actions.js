import * as types from './mutation-types';
import categoryService from '../service/category-service';

export default {
  getCategories({ commit, state }) {
    return categoryService.getList().then(categories => {
      commit(types.SET_CATEGORIES, categories);
    });
  },
  getCategoriesId({ commit, state }, params) {
    return categoryService.getList(params).then(categories => {
      commit(types.SET_CATEGORIES, categories);
    });
  }
};

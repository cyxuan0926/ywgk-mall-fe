import * as types from './mutation-types';
import shoppingCartService from '../service/shopping-cart-service';

export default {
  getCart({ commit, state }) {
    return shoppingCartService.get().then(cartItems => {
      commit(types.SET_CART, cartItems);
    });
  },
  getCartItemsNumber({ commit, state }) {
    return shoppingCartService.getNumber().then((count) => {
      commit(types.SET_COUNT, count);
    });
  },
  updateCartQuantity({ commit, state }, { cartItemId, quantity }) {
    return shoppingCartService.update(cartItemId, quantity);
  },
  deleteCartItems({ commit, state }, cartItemIds) {
    return shoppingCartService.delete(cartItemIds);
  },
  clearCart({ commit, state }) {
    return shoppingCartService.clear();
  }
};

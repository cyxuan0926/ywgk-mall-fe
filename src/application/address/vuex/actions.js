import * as types from './mutation-types';
import addressService from '../service/address-service';

export default {
  getAddress({ commit, state }, addressId) {
    return addressService.getAddress(addressId).then(address => {
      commit(types.SET_ADDRESS, address);
    });
  },
  getAddressDefault({ commit, state }) {
    return addressService.getDefault().then(addressDefault => {
      commit(types.SET_ADDRESS_DEFAULT, addressDefault);
    });
  },
  getAllAddresses({ commit, state }) {
    return addressService.getAddresses().then(allAddress => {
      commit(types.SET_ALL_ADDRESSES, allAddress);
    });
  },
  updateAddress({ commit, state }) {
    return addressService.update(state.address);
  },
  addAddress({ commit, state }) {
    return addressService.add(state.address);
  },
  deleteAddress({ commit, state }, id) {
    return addressService.delete(id);
  }
};

import _ from 'lodash';
import * as types from './mutation-types';

export default {
  [types.SET_ADDRESS_ADD](state, addressAdd) {
    state.addressAdd = addressAdd;
  },
  [types.SET_ADDRESS](state, address) {
    state.address = address;
  },
  [types.REPLACE_ADDRESS](state, address) {
    state.address = _.cloneDeep(address);
  },
  [types.SET_ADDRESS_DEFAULT](state, addressDefault) {
    state.addressDefault = addressDefault;
  },
  [types.SET_ALL_ADDRESSES](state, allAddresses) {
    state.allAddresses = allAddresses;
  },
  [types.SET_SELECTED_ADDRESS](state, selectedAddress) {
    state.selectedAddress = selectedAddress;
  },
  [types.SET_ADDRESS_ENTRY_ID](state, addressEntryId) {
    state.AddressEntryId = addressEntryId;
  }
};

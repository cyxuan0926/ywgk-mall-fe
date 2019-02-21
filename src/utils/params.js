import _ from 'lodash';

function reduce(filter) {
  return _.reduce(
    filter,
    (result, value, key) => {
      if (value) {
        result[key] = value;
      }
      return result;
    },
    {}
  );
}

function transform(pagination) {
  const params = {};
  params.page = pagination.page - 1;
  params.size = pagination.size;
  if (pagination.sort) {
    params.sort = `${pagination.sort.prop},${pagination.sort.order.replace('ending', '')}`;
  }
  return params;
}

export default {
  build(filter, pagination) {
    let params = Object.assign({}, reduce(filter));
    if (pagination) {
      params = Object.assign(params, transform(pagination));
    }
    return params;
  }
};

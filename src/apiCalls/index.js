import { HTTP } from './http-common';

export const getDashboardBanners = (callback, errorcallback) => {
  HTTP.get('dashboard/banner')
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
};

export const getCategoryLists = (callback, errorcallback) => {
  HTTP.get('dashboard/categories')
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
};

export const getProductLists = (category, callback, errorcallback) => {
  const productCategory = category ? category : '';
  HTTP.get(`dashboard/products/?category=${productCategory}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
};

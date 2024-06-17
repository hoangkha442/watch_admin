import { https } from "./config";

export const productService = {
  //CATEGORY 
  getCategory : () => { 
    return https.get('/category')
  },
  getCategoryId : (id) => { 
    return https.get(`/category/${id}`)
  },
  upateCategory: (id, extraObj) => {
    return https.put(`/category/${id}`, extraObj)
  },
  deleteCategory: (id) => { 
    return https.delete(`/category/${id}`)  
  },
  postCategory: (data) => {
    return https.post(`/category`, data);
  },

  // Suppliers
  getSupplier: () => { 
    return https.get(`/supplier`)  
  },
  getSupplierId: (id) => { 
    return https.get(`/supplier/${id}`)
  },
  postSupplier: (data) => {
    return https.post('/supplier', data)
  },
  putSupplier: (id, extraObj) => { 
    return https.put(`/supplier/${id}`, extraObj);  
  },
  deleteSupplier: (id) => {
    return https.delete(`/supplier/${id}`)
  },

  // Products
  getProduct: () => { 
    return https.get(`/product`)
  },
  getProductId: (id) => {
    return https.get(`/product/get-product/${id}`)
  },
  getProductPagination: (page, pageSize) => { 
    return https.get(`/product/pagination?page=${page}&pageSize=${pageSize}`)
  },
  getProductName: (prdName) => { 
    return https.get(`/product/search/${prdName}`)  
  },
  postProduct: (data) => {
    return https.post(`/product`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  putProduct: (id, extraObj) => {
    return https.put(`/product/${id}`, extraObj)
  },
  putProductPicture: (id, formData) => { 
    return https.put(`/product/picture/${id}`, formData)
  },
  putHiddendProduct: (id) => {
    return https.put(`/product/hidden-product/${id}`)
  },
  deleteProduct: (id) => {
    return https.delete(`/product/${id}`)
  },

  // PAYMENTS
  getPayment : () => { 
    return https.get(`/payment-detail`)
  },
  getPaymentId : (id) => { 
    return https.get(`/payment-detail/${id}`)
  },

  // ORDER_DETAIL
  getOrderDetail : () => {
    return https.get(`/order-detail`)
  },
  getOrderDetailId : (id) => {
    return https.get(`/order-detail/user/${id}`)
  },

  // ORDER
  getOrder: () => { 
    return https.get(`/order`)
  },
  putStatusOrder: (id, data) => {
    return https.put(`/order/${id}/status`, data)
  },

  // SHIPPING
  getShipping: () => { 
    return https.get(`/shipping-details`)  
  },

  // PRODUCT_IMAGES
  updateProduct: (productId, productData) => {
    return https.put(`/product/${productId}`, productData);
  },

  updateProductPictures: (productId, formData) => {
    return https.put(`/product/picture/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // New method to update individual images
  updateProductImage: (imageId, formData) => {
    return https.put(`/product-image/${imageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Fetch product images by product ID
  getProductImages: (productId) => {
    return https.get(`/product/${productId}/images`);
  }
}   
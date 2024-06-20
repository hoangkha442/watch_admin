import { https } from "./config";

export const productService = {
  // Categories
  getCategory: () => https.get('/category'),
  getCategoryId: (id) => https.get(`/category/${id}`),
  upateCategory: (id, extraObj) => https.put(`/category/${id}`, extraObj),
  deleteCategory: (id) => https.delete(`/category/${id}`),
  postCategory: (data) => https.post(`/category`, data),

  // Suppliers
  getSupplier: () => https.get(`/supplier`),
  getSupplierId: (id) => https.get(`/supplier/${id}`),
  postSupplier: (data) => https.post('/supplier', data),
  putSupplier: (id, extraObj) => https.put(`/supplier/${id}`, extraObj),
  deleteSupplier: (id) => https.delete(`/supplier/${id}`),

  // Products
  getProduct: () => https.get(`/product`),
  getProductId: (id) => https.get(`/product/get-product/${id}`),
  getProductPagination: (page, pageSize) => https.get(`/product/pagination?page=${page}&pageSize=${pageSize}`),
  getProductName: (prdName) => https.get(`/product/search/${prdName}`),
  postProduct: (data) => https.post(`/product`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  putProduct: (id, extraObj) => https.put(`/product/${id}`, extraObj),
  putProductPicture: (id, formData) => https.put(`/product/picture/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  putHiddendProduct: (id) => https.put(`/product/hidden-product/${id}`),
  deleteProduct: (id) => https.delete(`/product/${id}`),

  // Payments
  getPayment: () => https.get(`/payment-detail`),
  getPaymentId: (id) => https.get(`/payment-detail/${id}`),

  // Order Details
  getOrderDetail: () => https.get(`/order-detail`),
  getOrderDetailId: (id) => https.get(`/order-detail/user/${id}`),

  // Orders
  getOrder: () => https.get(`/order`),
  putStatusOrder: (id, data) => https.put(`/order/${id}/status`, data),

  // Shipping
  getShipping: () => https.get(`/shipping-details`),

  // Product Images
  updateProduct: (productId, productData) => https.put(`/product/${productId}`, productData),
  updateProductPictures: (productId, formData) => {
    return https.put(`/product/picture/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateProductImage: (imageId, formData) => {
    return https.put(`/product-images/${imageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getProductImages: (productId) => https.get(`/product/${productId}/images`),

  // Get a single product image by ID
  getProductImageById: (imageId) => https.get(`/product-images/${imageId}`),

  // Update a single product image
  putProductImage: (imageId, formData) => {
    return https.put(`/product-images/${imageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
}

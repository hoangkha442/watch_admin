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

}   
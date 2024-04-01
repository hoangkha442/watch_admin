import { https } from "./config";

export const userService = {
  getUser: () => { 
    return https.get('/user')  
  },
  getUserID: (userId) => { 
    return https.get(`/user/${userId}`)  
  },
  getUserToken: () => {
    return https.get('/user/profile') 
  },
  getUserPagination: (page, pageSize) => {
    return https.get(`/user/pagination?page=${page}&pageSize=${pageSize}`);
  },
  hiddenUser: (userId) => {
    return https.put(`/user/hidden-user/${userId}`);
  },
  updateUser: (userId, extraObject) => { 
    return https.put(`/user/update-user/${userId}`, extraObject);
  },
  createUser: (data) => { 
    return https.post(`/user`, data);
  },
  deleteUser: (userId) => {
    return https.delete(`/user/${userId}`);
  },
  
}   
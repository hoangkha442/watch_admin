import { https } from "./config";

export const userService = {
  getUser: () => https.get('/user'),
  getMyInfor: () => https.get('/user/get-info'),
  getUserID: (userId) => https.get(`/user/user/${userId}`),
  getUserToken: () => https.get('/user/profile'),
  getUserPagination: (page, pageSize) => https.get(`/user/pagination?page=${page}&pageSize=${pageSize}`),
  getAdminPagination: (page, pageSize) => https.get(`/user/pagination-admin?page=${page}&pageSize=${pageSize}`),
  hiddenUser: (userId) => https.put(`/user/hidden-user/${userId}`),
  updateUser: (userId, extraObject) => https.put(`/user/update-user/${userId}`, extraObject),
  createUser: (data) => https.post(`/user`, data),
  deleteUser: (userId) => https.delete(`/user/${userId}`),

  // Upload avatar
  uploadAvatar: (userId, formData) => https.post(`/user/${userId}/upload-avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

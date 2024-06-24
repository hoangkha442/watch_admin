import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../headerSlice';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { userService } from '../../../services/UserService';
import { productService } from '../../../services/ProductService';
import { fetchProducts } from '../../products/AsyncThunkAction';
import { fetchSuppliers } from '../../supplier/supplierSlice';
import { fetchCategories } from '../../productCategories/categorySlice';
import { fetchUsers } from '../../users/userSlice';
import { fetchAdmin } from '../../settings/team/teamSlice';

export default function ConfirmHiddenUserModalBody({ extraObject, closeModal }) {
    const dispatch = useDispatch();
    const currentPageProduct = useSelector((state) => state.products.currentPage);
    const currentPageUsers = useSelector((state) => state.users.currentPage);
    const currentPage = useSelector((state) => state.teams.currentPage);

    const { message, type, index } = extraObject;
    const user_id = index 
    const proceedWithYes = async () => {
        if(type === CONFIRMATION_MODAL_CLOSE_TYPES.USER_HIDDEN){
            userService.hiddenUser(user_id).then((res) => { 
                dispatch(showNotification({message : "Đã ẩn người dùng thành công", status : 1}))
                dispatch(fetchUsers({ currentPage: currentPageUsers, sizeItem: 5}))
                dispatch(fetchAdmin({ currentPage: currentPage, sizeItem: 5}))
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE){
            userService.deleteUser(user_id).then((res) => { 
                dispatch(showNotification({message : "Đã xóa người dùng thành công", status : 1}))
                dispatch(fetchUsers({ currentPage: currentPageUsers, sizeItem: 5}))
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.CATE_DELETE){
            productService.deleteCategory(index).then((res) => {
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchCategories());
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.SUPP_DELETE){
            productService.deleteSupplier(index).then((res) => {
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchSuppliers());
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_HIDDEN){
            productService.putHiddendProduct(index).then((res) => {
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchProducts({ currentPage: currentPageProduct, sizeItem: 4 }));
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE){
            productService.deleteProduct(index).then((res) => {
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchProducts({ currentPage: currentPageProduct, sizeItem: 4 }));
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        closeModal()
    };

    return (
        <>
            <p className='text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={() => closeModal()}>Hủy bỏ</button>
                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>
            </div>
        </>
    );
}

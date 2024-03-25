import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../common/modalSlice'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TitleCard from '../../components/Cards/TitleCard'
import { productService } from '../../services/ProductService'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { fetchSuppliers } from '../supplier/supplierSlice'
import { fetchCategories } from './categorySlice'
const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm danh mục mới", bodyType : MODAL_BODY_TYPES.CATE_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
export default function Categories() {
    // const [category, setCategory] = useState()
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);
    const category = useSelector((state) => state.categories.categories)
    // console.log('categories: ', category);
    const deleteCurrentCategory = (index) => {
        dispatch(openModal({title : "Xác nhận", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn xóa danh mục này không?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.CATE_DELETE, index}}))
    }

    const openEditModal = (uID) => {
        productService.getCategoryId(uID).then((res) => { 
            dispatch(openModal({title : "Chỉnh sửa danh mục sản phẩm!", bodyType : MODAL_BODY_TYPES.CATE_EDIT, extraObject: res?.data}))
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    }
  return (
    <>
        <TitleCard title="Danh mục sản phẩm" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((c, k) => { 
                                return (
                                    <tr key={c?.category_id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold">{c?.category_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{c?.description}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCategory(c?.category_id)}><TrashIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => openEditModal(c?.category_id)}><PencilSquareIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
    </>
  )
}

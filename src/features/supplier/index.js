import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { openModal } from '../common/modalSlice'
import TitleCard from '../../components/Cards/TitleCard'
import { productService } from '../../services/ProductService'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'


const TopSideButtons = () => {
    const dispatch = useDispatch()
    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm nhà cung cấp", bodyType : MODAL_BODY_TYPES.SUPP_ADD_NEW}))
    }
    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
export default function Suppliers() {
    const dispatch = useDispatch()
    const [supplier, setSupplier] = useState()
    useEffect(() => { 
        productService.getSupplier().then((res) => { 
            setSupplier(res.data)
        }).catch((err) => {  })
    }, [supplier])
    const deleteCurrentSupplier = (index, name) => {
        dispatch(openModal({title : "Xóa nhà cung cấp", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn xóa nhà cung cấp ${name} không?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.SUPP_DELETE, index}}))
    }
    const openEditModal = (suppID) => {
        productService.getSupplierId(suppID).then((res) => { 
            dispatch(openModal({title : "Chỉnh sửa nhà cung cấp!", bodyType : MODAL_BODY_TYPES.SUPP_EDIT, extraObject: res?.data}))
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    }
  return (
    <>
        <TitleCard title="Nhà cung cấp sản phẩm" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Tên nhà cung cấp</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            supplier?.map((sup, k) => { 
                                return(
                                    <tr key={sup?.supplier_id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold">{sup?.supplier_name}</div>
                                                    <div className="text-sm opacity-60 font-medium">{sup?.contact_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{sup?.contact_email}</td>
                                        <td>{sup?.address}</td>
                                        <td>{sup?.phone}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentSupplier(sup?.supplier_id, sup?.supplier_name)}><TrashIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => openEditModal(sup?.supplier_id)}><PencilSquareIcon className="w-5"/></button>
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

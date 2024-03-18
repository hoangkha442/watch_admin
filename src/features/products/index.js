import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { openModal } from '../common/modalSlice'
import TitleCard from '../../components/Cards/TitleCard'
const TopSideButtons = () => {
    const dispatch = useDispatch()
    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm sản phẩm mới", bodyType : MODAL_BODY_TYPES.USER_ADD_NEW}))
    }
    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
export default function Products() {
    useEffect(() => { 
        
    }, [])
  return (
    <>
            <TitleCard title="Sản phẩm hiện tại" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng tồn</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            </TitleCard>

    </>
  )
}

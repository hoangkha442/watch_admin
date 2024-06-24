import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { openModal } from '../common/modalSlice'
import TitleCard from '../../components/Cards/TitleCard'
import { productService } from '../../services/ProductService'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Pagination,Tooltip } from 'antd'
import { BASE_URL_IMG_PRD } from '../../services/config'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { fetchProducts } from './AsyncThunkAction'
import { setCurrentPage } from './productSlice'
import ProductImage from './ProductImage'

const TopSideButtons = () => {
    const dispatch = useDispatch()
    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm sản phẩm mới", bodyType : MODAL_BODY_TYPES.PRODUCT_ADD_NEW}))
    }
    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Thêm mới</button>
        </div>
    )
}
export default function Products() {
    const currentPage = useSelector((state) => state.products.currentPage);
    const [sizeItem, setSizeItem] = useState(4);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch()
    const onChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };
    useEffect(() => {
        dispatch(fetchProducts({ currentPage, sizeItem }));
    }, [dispatch, currentPage]);
    const getStatus = (index) => {
        if(index === false)return <div className="font-medium py-3 px-5 badge badge-accent">Hiện</div>
        else return <div className="badge badge-ghost font-medium py-3 px-5">Ẩn</div>
    }
    const hiddendProduct = (index, is_visible) => {
        dispatch(openModal({title : `${is_visible === false ? "Hiện sản phẩm" : "Ẩn sản phẩm"}`, bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message :  `${is_visible === false ? "Bạn có muốn hiện sản phẩm này không?" : "bạn có muốn ẩn sản phẩm này không?"}`, type : CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_HIDDEN, index}}))
    }
    const deleteCurentProduct = (index, prdName) => {
        dispatch(openModal({title : "Xóa sản phẩm", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn xóa ${prdName}`, type : CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE, index}}))
    }
    const openEditModal = (prdId) => {
        productService.getProductId(prdId).then((res) => { 
            console.log('res: ', res);
            dispatch(openModal({title : "Chỉnh sửa sản phẩm", bodyType : MODAL_BODY_TYPES.PRODUCT_EDIT, extraObject: res?.data}))
        })
        .catch(err => err)
    }
  return (
    <>
            <TitleCard title="Sản phẩm hiện tại" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Hình ảnh sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng tồn</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products?.data?.map((prd, k) => { 
                            return(
                                <tr key={prd?.product_id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-20 h-20">
                                                    <ProductImage products={prd} />
                                                </div>
                                            </div>
                                            {prd?.product_images?.length > 1 && (
                                                <div className="flex space-x-2 pt-10">
                                                {prd.product_images.slice(1).map((image, index) => (
                                                    <Tooltip key={index} title={<img src={`${BASE_URL_IMG_PRD}${image.image_url}`} alt="Additional" style={{ maxWidth: '130px', maxHeight: '130px' }} />}>
                                                    <Avatar
                                                        size={30}
                                                        shape="square"
                                                        src={`${BASE_URL_IMG_PRD}${image.image_url}`}
                                                        alt={`Additional ${index + 1}`}
                                                    />
                                                    </Tooltip>
                                                ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                     <td>{prd?.product_name}</td>
                                    <td>{prd?.quantity_in_stock}</td>
                                    <td>{prd?.price}</td>
                                    <td>
                                        <button onClick={() => { hiddendProduct(prd?.product_id, prd?.is_visible)}}>{getStatus(prd?.is_visible)}</button>
                                    </td>
                                   <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => deleteCurentProduct(prd?.product_id, prd?.product_name)}><TrashIcon className="w-5"/></button>
                                        <button className="btn btn-square btn-ghost" onClick={() => openEditModal(prd?.product_id)}><PencilSquareIcon className="w-5"/></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <Pagination defaultCurrent={1} current={currentPage} onChange={onChange} total={products?.totalPage * 10}/>
            </div>
            </TitleCard>

    </>
  )
}

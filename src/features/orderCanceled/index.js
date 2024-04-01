
import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { productService } from '../../services/ProductService';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL_IMG_PRD } from '../../services/config';
import ViewfinderCircleIcon from '@heroicons/react/24/outline/ViewfinderCircleIcon';
import { openModal } from '../common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { fetchOrderCanceled } from '../orders/orderSlice';


const formatProductDescription = (description) => {
  return description?.length > 20 ? `${description.slice(0, 20)}...` : description;
};
const OrderCanceled = () => {
  const [orderProduct, setOrderProduct] = useState([]);
  const [shipping, setShipping] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrderCanceled());
  }, [dispatch]);

  useEffect(() => {
    productService.getShipping().then((res) => { 
      setShipping(res.data)
    })
    productService.getOrderDetail().then((res) => {
      const orderToUserIdMap = new Map(orders.map(order => [order.order_id, order.user_id]));
      const matchingOrderDetails = res.data?.filter(detail => orderToUserIdMap.has(detail.order_id));
      setOrderProduct(matchingOrderDetails);
    }).catch(error => {
      console.error('Error fetching order details:', error);
    });
  }, [orders]);
  const getStatus = (index) => {
    if(index === 'delivered')return <div className="font-medium py-3 px-5 badge badge-accent">{index}</div>
    else return <div className="badge badge-ghost font-medium py-3 px-5">{index}</div>
  }
  const openViewModal = (detail) => {
    dispatch(openModal({ title: "Chi tiết giao dịch", bodyType: MODAL_BODY_TYPES.VIEW_ORDER, extraObject: detail }))
};

  return (
    <>
      <TitleCard title={`${orderProduct.length} Đơn hàng bị hủy`} topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Tên người đặt</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ nhận hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Tình trạng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderProduct.map((product, index) => {
                // console.log('orderProduct: ', orderProduct);
                const relatedOrder = orders.find(order => order.order_id === product.order_id);
                // console.log('relatedOrder: ', relatedOrder);
                const relatedShiping = shipping.find(shipping => shipping.order_id === product.order_id)
                // console.log('relatedShiping: ', relatedShiping);
                return (
                  <tr key={product?.order_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-20 h-20">
                            {product?.products?.product_picture == null ? <Avatar icon={<UserOutlined />} /> : <img src={BASE_URL_IMG_PRD + product?.products?.product_picture} alt="Product" />}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product?.products?.product_name}</div>
                          <div className="text-sm opacity-50">{formatProductDescription(product?.products?.description)}</div>
                        </div>
                      </div>
                    </td>
                    <td>{relatedOrder?.users?.full_name}</td>
                    <td>{relatedOrder?.users?.phone}</td>
                    <td>{relatedShiping?.shipping_address}</td>
                    <td>{moment(relatedOrder?.order_date).format("D MMM YYYY")}</td>
                    <td>
                      {getStatus(relatedOrder?.status)}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => openViewModal(product)}>
                        <ViewfinderCircleIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default OrderCanceled
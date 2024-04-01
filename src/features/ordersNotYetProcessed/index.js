import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TitleCard from '../../components/Cards/TitleCard';
import { fetchOrdersNYP } from './orderNYSlice'; // Ensure this thunk is properly implemented
import { productService } from '../../services/ProductService';
import { BASE_URL_IMG_PRD } from '../../services/config';
import ViewfinderCircleIcon from '@heroicons/react/24/outline/ViewfinderCircleIcon';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { openModal } from '../common/modalSlice';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'


const formatProductDescription = (description) => description?.length > 20 ? `${description.slice(0, 20)}...` : description;

const OrdersNotYetProcessed = () => {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const orders = useSelector((state) => state.orderNYP.ordersNYP);
  console.log('orders: ', orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersNYP());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shippingData = await productService.getShipping();
        const orderDetailsData = await productService.getOrderDetail();
        const combinedData = orders.map(order => ({
          ...order,
          ...orderDetailsData.data.find(detail => detail.order_id === order.order_id),
          shipping_address: shippingData.data.find(shipping => shipping.order_id === order.order_id)?.shipping_address,
        }));
        setOrdersDetails(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (orders.length) fetchData();
  }, [orders]);

  const openEditModal = (detail) =>{
    dispatch(openModal({ title: "Cập nhật trạng thái đơn hàng!", bodyType: MODAL_BODY_TYPES.EDIT_ORDERNYP, extraObject: detail }))
  }
  return (
    <>
      <TitleCard title={`${ordersDetails.length} Đơn hàng chưa xử lí`} topMargin="mt-2">
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
              {ordersDetails.map((order, index) => (
                <tr key={index}>
                  <td>
                  <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-20 h-20">
                            {order?.products?.product_picture == null ? <Avatar icon={<UserOutlined />} /> : <img src={BASE_URL_IMG_PRD + order?.products?.product_picture} alt="Product" />}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order?.products?.product_name}</div>
                          <div className="text-sm opacity-50">{formatProductDescription(order?.products?.description)}</div>
                        </div>
                      </div>
                  </td>
                  <td>{order?.users?.full_name}</td>
                  <td>{order?.users?.phone}</td>
                  <td>{order.shipping_address}</td>
                  <td>{moment(order?.order_date).format("D MMM YYYY")}</td>
                  <td>
                    <button className='badge badge-accent font-medium py-3 px-5'>
                      {order?.status}
                    </button>
                  </td>
                  <td>
                      <button className="btn btn-sm btn-outline" onClick={() => openEditModal(order)}><PencilSquareIcon className="w-5"/></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default OrdersNotYetProcessed;

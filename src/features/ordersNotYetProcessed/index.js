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
import { openModal } from '../common/modalSlice';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';

const formatProductDescription = (description) => 
  description?.length > 20 ? `${description.slice(0, 20)}...` : description;

const OrdersNotYetProcessed = () => {
  const [ordersDetails, setOrdersDetails] = useState([]);
  console.log('ordersDetails: ', ordersDetails);
  const orders = useSelector((state) => state.orderNYP.ordersNYP);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersNYP());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shippingData = await productService.getShipping();
        const orderDetailsData = await productService.getOrderDetail();

        const combinedData = orders.map(order => {
          const orderDetail = orderDetailsData.data.find(detail => detail.order_id === order.order_id);
          const shippingDetail = shippingData.data.find(shipping => shipping.order_id === order.order_id);

          return {
            ...order,
            products: orderDetail ? [orderDetail] : [], // Đảm bảo products là mảng
            shipping_address: shippingDetail?.shipping_address || 'N/A',
          };
        });

        setOrdersDetails(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (orders.length) fetchData();
  }, [orders]);

  const openEditModal = (detail) => {
    dispatch(openModal({
      title: "Cập nhật trạng thái đơn hàng!",
      bodyType: MODAL_BODY_TYPES.EDIT_ORDERNYP,
      extraObject: detail
    }));
  };

  return (
    <>
      <TitleCard title={`${ordersDetails.length} Đơn hàng chưa xử lý`} topMargin="mt-2">
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
              {ordersDetails.map((order, index) => {
                const product = order.products[0] || {}; // Đảm bảo products[0] tồn tại
                const user = order.users || {}; // Đảm bảo user tồn tại

                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          {/* <div className="mask mask-squircle w-20 h-20">
                            {product.product_picture ? (
                              <img src={BASE_URL_IMG_PRD + product.product_picture} alt="Product" />
                            ) : (
                              <Avatar icon={<UserOutlined />} />
                            )}
                          </div> */}
                        </div>
                        <div>
                          <div className="font-bold">{product?.products?.product_name || 'N/A'}</div>
                          <div className="text-sm opacity-50">{formatProductDescription(product?.products?.description)}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.full_name || 'N/A'}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>{order.shipping_address || 'N/A'}</td>
                    <td>{order.order_date ? moment(order.order_date).format("D MMM YYYY") : 'N/A'}</td>
                    <td>
                      <span className={`badge font-medium py-3 px-5 ${order.status === 'pending' ? 'badge-warning' : 'badge-secondary'}`}>
                        {order.status || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => openEditModal(order)}>
                        <PencilSquareIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default OrdersNotYetProcessed;

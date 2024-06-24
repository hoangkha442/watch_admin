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
import { fetchOrderShipped } from '../orders/orderSlice';

const formatProductDescription = (description) => {
  return description?.length > 20 ? `${description.slice(0, 20)}...` : description;
};

const OrderShipped = () => {
  const [orderProduct, setOrderProduct] = useState([]);
  const [shipping, setShipping] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrderShipped());
  }, [dispatch]);

  useEffect(() => {
    productService.getShipping().then((res) => {
      setShipping(res.data);
    }).catch(error => {
      console.error('Error fetching shipping details:', error);
    });
    
    productService.getOrderDetail().then((res) => {
      const orderToUserIdMap = new Map(orders.map(order => [order.order_id, order.user_id]));
      const matchingOrderDetails = res.data?.filter(detail => orderToUserIdMap.has(detail.order_id));
      setOrderProduct(matchingOrderDetails);
    }).catch(error => {
      console.error('Error fetching order details:', error);
    });
  }, [orders]);

  const getStatus = (status) => {
    return (
      <div className={`font-medium py-3 px-5 badge ${status === 'delivered' ? 'badge-accent' : 'badge-ghost'}`}>
        {status}
      </div>
    );
  };

  // Hàm nhóm các sản phẩm theo đơn hàng
  const groupProductsByOrder = (orderDetails) => {
    const grouped = orderDetails.reduce((acc, detail) => {
      if (!acc[detail.order_id]) {
        acc[detail.order_id] = {
          order: orders.find(order => order.order_id === detail.order_id),
          products: [],
        };
      }
      acc[detail.order_id].products.push(detail);
      return acc;
    }, {});
    
    return Object.values(grouped);
  };

  // Nhóm các sản phẩm theo đơn hàng
  const groupedOrders = groupProductsByOrder(orderProduct);

  const openViewModal = (group) => {
    dispatch(openModal({ title: "Chi tiết giao dịch", bodyType: MODAL_BODY_TYPES.VIEW_ORDER, extraObject: {
      ...group.order,
      products: group.products,
      shipping: shipping.find(ship => ship.order_id === group.order.order_id)
    }}));
  };

  return (
    <>
      <TitleCard title={`${groupedOrders.length} Đơn hàng đã vận chuyển`} topMargin="mt-2">
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
              {groupedOrders.map((group, index) => {
                const relatedOrder = group.order;
                const relatedShipping = shipping.find(ship => ship.order_id === relatedOrder?.order_id);

                if (!relatedOrder || !group.products || !group.products[0]) {
                  return null; // Nếu dữ liệu không đầy đủ, bỏ qua hàng này
                }

                return (
                  <tr key={relatedOrder?.order_id || index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          {/* <div className="mask mask-squircle w-20 h-20">
                            {group.products[0]?.products?.product_picture == null ? 
                              <Avatar icon={<UserOutlined />} /> : 
                              <img src={BASE_URL_IMG_PRD + group.products[0]?.products?.product_picture} alt="Product" />}
                          </div> */}
                        </div>
                        <div>
                          <div className="font-bold">{group.products[0]?.products?.product_name || 'N/A'}</div>
                          <div className="text-sm opacity-50">{formatProductDescription(group.products[0]?.products?.description)}</div>
                        </div>
                      </div>
                    </td>
                    <td>{relatedOrder?.users?.full_name || 'N/A'}</td>
                    <td>{relatedOrder?.users?.phone || 'N/A'}</td>
                    <td>{relatedShipping?.shipping_address || 'N/A'}</td>
                    <td>{relatedOrder?.order_date ? moment(relatedOrder.order_date).format("D MMM YYYY") : 'N/A'}</td>
                    <td>{getStatus(relatedOrder?.status)}</td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => openViewModal(group)}>
                        <ViewfinderCircleIcon className="w-5 h-5" />
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

export default OrderShipped;

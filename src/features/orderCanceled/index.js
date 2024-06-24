import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { productService } from '../../services/ProductService';
import { openModal } from '../common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { fetchOrderCanceled } from '../orders/orderSlice';
import ViewfinderCircleIcon from '@heroicons/react/24/outline/ViewfinderCircleIcon';

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
      <div className={`badge font-medium py-2 px-3 ${status === 'canceled' ? 'bg-red-500 text-white' : 'badge-ghost'}`}>
        {status}
      </div>
    );
  };

  // Nhóm các sản phẩm theo đơn hàng
  const groupProductsByOrder = (orderDetails) => {
    if (!orderDetails) return [];
    const grouped = orderDetails.reduce((acc, detail) => {
      const order = orders.find(order => order.order_id === detail.order_id);
      if (order) {
        if (!acc[detail.order_id]) {
          acc[detail.order_id] = {
            order,
            products: [],
          };
        }
        acc[detail.order_id].products.push(detail);
      }
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Nhóm các sản phẩm theo đơn hàng
  const groupedOrders = groupProductsByOrder(orderProduct);

  const openViewModal = (group) => {
    dispatch(openModal({
      title: "Chi tiết giao dịch",
      bodyType: MODAL_BODY_TYPES.VIEW_ORDER,
      extraObject: {
        ...group.order,
        products: group.products,
        shipping: shipping.find(ship => ship.order_id === group.order.order_id) || {}
      }
    }));
  };

  return (
    <>
      <TitleCard title={`${groupedOrders.length} Đơn hàng bị hủy`} topMargin="mt-2">
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
                
                // Kiểm tra dữ liệu đầy đủ trước khi hiển thị
                if (!relatedOrder || !relatedOrder.order_id) return null;

                return (
                  <tr key={relatedOrder.order_id || index}>
                    <td>
                      <div className="flex flex-col">
                        <div className="font-bold">{group.products[0]?.products?.product_name || 'N/A'}</div>
                        <div className="text-sm opacity-50">{formatProductDescription(group.products[0]?.products?.description)}</div>
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

export default OrderCanceled;

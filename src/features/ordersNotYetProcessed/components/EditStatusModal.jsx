import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_IMG_PRD } from "../../../services/config";
import { fetchOrders } from "../../orders/orderSlice";
import { fetchOrdersNYP, updateOrderStatus } from "../orderNYSlice";
import { showNotification } from "../../common/headerSlice";
import { productService } from "../../../services/ProductService";
import SelectBox from '../../../components/Input/SelectBox';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditStatusModal({ closeModal, extraObject }) {
    const [status, setStatus] = useState(extraObject.orders.status || 'pending');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const saveOrderStatus = () => {
      dispatch(updateOrderStatus({ orderId: extraObject.order_id, newStatus: status }))
        .then((res) => {
          dispatch(showNotification({ message: 'Cập nhật trạng thái đơn hàng thành công', status: 1}));
          dispatch(fetchOrdersNYP());
          closeModal();
          if(status === 'pending'){
            navigate('/app/orders-not-yet-precessed')
          }else if(status === 'Cancel'){
            navigate('/app/order-canceled')
          }else {
            navigate('/app/order-shipped')
          }
        })
        .catch((err) => {
          dispatch(showNotification({ message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.', status: 'error' }));
        });
    };
    
      const typeOptions = [
        { name: 'Đơn hàng đang xử lí', value: 'pending' },
        { name: 'Hủy đơn hàng', value: 'Cancel' },
        { name: 'Duyệt đơn hàng', value: 'shipped' },
      ];
  return (
    <div className="modal-content-container">
      <div class="p-4 rounded-lg shadow-md max-w-sm mx-auto">
      <div class="flex items-start space-x-4">
          <img
            class="w-16 h-16 object-cover rounded-md"
            src={BASE_URL_IMG_PRD + extraObject.products.product_picture}
            alt="Product Image"
          />
          <div class="flex-1">
            <h2 class="text-lg font-bold">
              {extraObject.products.product_name}
            </h2>
            <p class=" text-sm line-through">{(extraObject.products.price * 1.10).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            <p class="text-red-500 font-bold">{extraObject.products.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <span class="text-sm font-medium ">{extraObject.quantity} sản phẩm</span>
          <span class="text-lg font-bold text-red-600">
            Thành tiền: {(extraObject.products.price * extraObject.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
          </span>
        </div>
        <div class="border-t mt-4 pt-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <div class="p-1 bg-red-100 text-red-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
              </div>
              <span class="text-sm font-medium">
                Đang chờ xác nhận
              </span>
            </div>
            <a href="#" class="text-red-500 text-sm font-medium">
                {extraObject.orders.status === "delivered" ? "Đã nhận được hàng" : "Chưa nhận được hàng"}
            </a>
          </div>
          <p class="text-sm mt-2">
            Liên hệ với khách hàng thông qua số điện thoại <a className="font-[500] text-sm" href={`tel:${extraObject.orders.users.phone}`}>{extraObject.orders.users.phone}</a> hoặc Email <a className="font-[500] text-sm" href={`mailto:${extraObject.orders.users.email}`}>{extraObject.orders.users.email}</a> để giải quyết mọi vấn đề về đơn hàng
          </p>
        </div>
        <div className="mt-5">
        <SelectBox
          labelTitle="Chọn trạng thái"
          labelDescription="Chọn một trạng thái dành cho đơn hàng trên"
          defaultValue={status}
          containerStyle="mb-4"
          placeholder="Chọn trạng thái đơn hàng"
          labelStyle="" 
          options={typeOptions}
          updateType="status"
          updateFormValue={(e) => setStatus(e.value)}
        />
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal}>Hủy</button>
          <button className="btn btn-primary px-6" onClick={saveOrderStatus}>Lưu</button>
        </div>
        </div>
      
      </div>
    </div>
  );
}

export default EditStatusModal;

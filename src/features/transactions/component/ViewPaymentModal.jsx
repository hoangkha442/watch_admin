import { useEffect, useState } from "react";
import { productService } from "../../../services/ProductService";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL_IMG_PRD, BASE_URL_IMG_USER } from "../../../services/config";
import moment from "moment";
import Swal from "sweetalert2";

function ViewPaymentModal({ closeModal, extraObject }) {
  const [orderObj, setOrderObj] = useState();
  const [products, setProducts] = useState([]);
  const [showFullEmail, setShowFullEmail] = useState(false);
  const [showFullPhone, setShowFullPhone] = useState(false);

  useEffect(() => {
    // Fetch order details
    productService.getOrderDetailId(extraObject.orders.user_id).then(res => {
      setOrderObj(res.data[0]);
    }).catch(err => console.error(err));

    // Fetch product details for each product ID
    if (extraObject.orders.productIDs.length > 0) {
      Promise.all(extraObject.orders.productIDs.map(id => productService.getProductId(id)))
        .then(responses => {
          setProducts(responses.map(response => response.data[0]));
        })
        .catch(err => console.error(err));
    }
  }, [extraObject.orders.user_id, extraObject.orders.productIDs]);

  // Hàm ẩn thông tin
  const hideSensitiveInfo = (info, type) => {
    if (!info) return "";

    // Ẩn email: ***...@domain.com
    if (type === "email") {
      const [localPart, domain] = info.split("@");
      return `${localPart.slice(0, 1)}****@${domain}`;
    }

    // Ẩn số điện thoại: ***...1234
    if (type === "phone") {
      return `****${info.slice(-4)}`;
    }

    return info;
  };

  // Hiển thị Swal confirm cho email
  const handleShowFullEmail = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có muốn xem đầy đủ địa chỉ email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d26e4b",
      cancelButtonColor: "#aaa",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        setShowFullEmail(true);
      }
    });
  };

  // Hiển thị Swal confirm cho số điện thoại
  const handleShowFullPhone = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có muốn xem đầy đủ số điện thoại?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d26e4b",
      cancelButtonColor: "#aaa",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        setShowFullPhone(true);
      }
    });
  };

  // Tổng tiền
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + (product.price * orderObj?.quantity || 0);
    }, 0);
  };

  return (
    <div className="p-6 border-2 border-[#5e17eb46] rounded-sm py-4 px-8 bg-white max-w-2xl mx-auto">
      <h2 className="text-xl overflow-hidden pt-2 pb-4 font-bold uppercase text-[#1c1c1c]">Chi tiết đơn hàng</h2>
      <div className="flex items-start space-x-4 mb-6">
        <Avatar size={64} src={BASE_URL_IMG_USER + extraObject?.orders?.users?.avatar} icon={<UserOutlined />} />
        <div>
          <h3 className="text-lg leading-[1.3] font-medium text-[#1c1c1c]">{extraObject?.orders?.users?.full_name}</h3>
          <p className="text-sm text-[#666]">
            {showFullEmail 
              ? <a href={`mailto:${extraObject?.orders?.users?.email}`}>{extraObject?.orders?.users?.email}</a> 
              : <a href="#" onClick={(e) => { e.preventDefault(); handleShowFullEmail(); }}>{hideSensitiveInfo(extraObject?.orders?.users?.email, "email")}</a>}
          </p>
          <p className="text-sm text-[#666]">
            {showFullPhone 
              ? <a href={`tel:${extraObject?.orders?.users?.phone}`}>{extraObject?.orders?.users?.phone}</a> 
              : <a href="#" onClick={(e) => { e.preventDefault(); handleShowFullPhone(); }}>{hideSensitiveInfo(extraObject?.orders?.users?.phone, "phone")}</a>}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2 border-b-[3px] border-[#ececec] pb-2">
          <span className='text-left leading-[1.3] text-base font-bold text-[#1c1c1c] uppercase'>Sản phẩm</span>
          <span className='text-left leading-[1.3] text-base font-bold text-[#1c1c1c] uppercase'>Tổng</span>
        </div>
        {products.map(product => (
          <div key={product.product_id} className="flex justify-between mb-2 border-b border-[#ececec] py-2">
            <span className='leading-[1.3] text-sm text-[#666]'>{product.product_name} <span className='font-bold'>× {orderObj?.quantity}</span></span>
            <span className='inline text-base font-bold leading-[18.72px] text-[#111]'>{(product.price * orderObj?.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
          </div>
        ))}
        <div className="flex justify-between mb-2 py border-b border-[#ececec] py-2">
          <span className='text-base font-bold leading-[14.28px] text-[#353535]'>Tổng phụ</span>
          <span className='inline text-base font-bold leading-[18.72px] text-[#111]'>{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className="flex justify-between mb-2 py-2">
          <span className='text-base font-bold leading-[14.28px] text-[#666]'>Giao hàng</span>
          <span className="text-sm leading-[16.848px] text-[#222]">Giao hàng miễn phí</span>
        </div>
        <div className="flex justify-between font-bold py-2 pt-2 border-t border-b-[3px] border-[#ececec]">
          <span className='text-base font-bold leading-[14.28px] text-[#353535]'>Tổng</span>
          <span className='inline text-base font-bold leading-[18.72px] text-[#111]'>{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg leading-[1.3] font-bold uppercase text-[#1c1c1c] mb-2">Thông tin thanh toán</h3>
        <div className="flex-col space-y-2">
          <p className="text-base font-medium leading-[14.28px] text-[#666]">Ngày đặt hàng: {moment(extraObject.orders.order_date).format('DD/MM/YYYY')}</p>
          <p className="text-base font-medium leading-[14.28px] text-[#666]">Phương thức thanh toán: {extraObject.payment_method}</p>
          <p className="text-base font-medium leading-[14.28px] text-[#666]">Trạng thái thanh toán: <span className={extraObject.payment_status === "pending" ? "text-[#d26e4b]" : "text-[#5cb85c]"}>{extraObject.payment_status === "pending" ? "Chưa thanh toán" : "Đã thanh toán"}</span></p>
          <p className="text-base font-medium leading-[14.28px] text-[#666]">Trạng thái đơn hàng: <span className={orderObj?.status === "delivered" ? "text-[#5cb85c]" : "text-[#f0ad4e]"}>{orderObj?.status === "delivered" ? "Đã giao thành công" : "Đang vận chuyển"}</span></p>
        </div>
      </div>
      <button onClick={closeModal} className="w-full py-2 bg-[#d26e4b] text-white font-bold rounded-sm mb-4">ĐÓNG</button>
    </div>
  );
}

export default ViewPaymentModal;

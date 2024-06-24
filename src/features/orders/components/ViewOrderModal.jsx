import { BASE_URL_IMG_USER } from "../../../services/config";
import moment from "moment";
import Swal from "sweetalert2";

function ViewOrderModal({ closeModal, extraObject }) {
  // Tính tổng tiền đơn hàng
  const calculateTotalPrice = () => {
    return extraObject.products.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Ẩn một phần email
  const obfuscateEmail = (email) => {
    const [user, domain] = email.split('@');
    return user.slice(0, 2) + '*****@' + domain;
  };

  // Ẩn một phần số điện thoại
  const obfuscatePhone = (phone) => {
    return phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4);
  };

  // Xử lý khi người dùng nhấp vào email hoặc điện thoại
  const handleContactClick = (type, value) => {
    Swal.fire({
      title: `Hiển thị ${type === 'email' ? 'email' : 'số điện thoại'}?`,
      text: `Bạn có muốn hiển thị ${type === 'email' ? 'email' : 'số điện thoại'} đầy đủ không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d26e4b',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Hiển thị',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'email') {
          window.location.href = `mailto:${value}`;
        } else {
          window.location.href = `tel:${value}`;
        }
      }
    });
  };

  return (
    <div className="p-6 border-2 border-[#5e17eb46] rounded-sm py-4 px-8 bg-white max-w-2xl mx-auto">
      <h2 className="text-xl font-bold uppercase text-[#1c1c1c] mb-4">Chi tiết đơn hàng</h2>
      <div className="flex items-start space-x-4 mb-6">
        <img
          className="w-20 h-20 object-cover rounded-md"
          src={BASE_URL_IMG_USER + extraObject?.users?.avatar}
          alt="User Avatar"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#1c1c1c]">{extraObject?.users?.full_name}</h3>
          <p className="text-sm text-gray-600">
            <a href="#" onClick={() => handleContactClick('email', extraObject?.users?.email)}>
              {obfuscateEmail(extraObject?.users?.email)}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <a href="#" onClick={() => handleContactClick('phone', extraObject?.users?.phone)}>
              {obfuscatePhone(extraObject?.users?.phone)}
            </a>
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2 border-b-[3px] border-[#ececec] pb-2">
          <span className='text-left leading-[1.3] text-base font-bold text-[#1c1c1c] uppercase'>Sản phẩm</span>
          <span className='text-left leading-[1.3] text-base font-bold text-[#1c1c1c] uppercase'>Tổng</span>
        </div>
        {extraObject.products.map(product => (
          <div key={product.product_id} className="flex justify-between mb-2 border-b border-[#ececec] py-2">
            <div>
              <h3 className="text-lg font-bold text-[#1c1c1c]">{product.products.product_name}</h3>
              <p className="text-sm text-[#666]">Số lượng: <span className="font-bold">{product.quantity}</span></p>
            </div>
            <span className='inline text-base font-bold leading-[18.72px] text-[#111]'>{(product.price * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
          </div>
        ))}
        <div className="flex justify-between mb-2 py border-b border-[#ececec] py-2">
          <span className='text-base font-bold leading-[14.28px] text-[#353535]'>Tổng phụ</span>
          <span className='inline text-base font-bold leading-[18.72px] text-[#111]'>{calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className="flex justify-between mb-2 py-2">
          <span className='text-base font-bold leading-[14.28px] text-[#666]'>Ngày đặt hàng</span>
          <span className="text-sm leading-[16.848px] text-[#222]">{moment(extraObject.order_date).format('DD/MM/YYYY')}</span>
        </div>
        <div className="flex justify-between mb-2 py-2">
          <span className='text-base font-bold leading-[14.28px] text-[#666]'>Giao hàng</span>
          <span className="text-sm leading-[16.848px] text-[#222]">Địa chỉ: {extraObject?.shipping?.shipping_address || 'N/A'}</span>
        </div>
        <div className="flex justify-between font-bold py-2 pt-2 border-t border-b-[3px] border-[#ececec]">
          <span className='text-base font-bold leading-[14.28px] text-[#353535]'>Tổng</span>
          <span className='inline text-base font-bold leading-[18.72px] text-[#111]'></span>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-red-100 text-red-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {extraObject.status === "delivered" ? "Đã giao thành công" : "Đang vận chuyển"}
            </span>
          </div>
          <a href="#" className="text-red-500 text-sm font-medium">
            {extraObject.status === "delivered" ? "Đã nhận được hàng" : "Chưa nhận được hàng"}
          </a>
        </div>
        <p className="text-sm text-gray-600">
          Liên hệ với khách hàng thông qua số điện thoại <a className="font-semibold text-sm text-blue-600" href="#" onClick={() => handleContactClick('phone', extraObject?.users?.phone)}>{obfuscatePhone(extraObject?.users?.phone)}</a> hoặc Email <a className="font-semibold text-sm text-blue-600" href="#" onClick={() => handleContactClick('email', extraObject?.users?.email)}>{obfuscateEmail(extraObject?.users?.email)}</a> để giải quyết mọi vấn đề về đơn hàng.
        </p>
      </div>
      <button onClick={closeModal} className="mt-6 w-full py-2 bg-[#d26e4b] text-white font-bold rounded-sm">ĐÓNG</button>
    </div>
  );
}

export default ViewOrderModal;

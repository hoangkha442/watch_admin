import { BASE_URL_IMG_PRD } from "../../../services/config";

function ViewOrderModal({ closeModal, extraObject }) {

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
            <p class="text-sm line-through">{(extraObject.products.price * 1.10).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            <p class="text-red-500 font-bold">{extraObject.products.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <span class="text-sm font-medium">{extraObject.quantity} sản phẩm</span>
          <span class="text-lg font-bold text-red-600">
            Thành tiền: {extraObject.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
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
                {extraObject.orders.status === "delivered" ? "Đã giao thành công" : "Đang vận chuyển"}
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
      </div>
    </div>
  );
}

export default ViewOrderModal;

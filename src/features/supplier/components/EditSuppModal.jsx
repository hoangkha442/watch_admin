import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';
import { fetchSuppliers } from '../supplierSlice';
import ErrorText from '../../../components/Typography/ErrorText';

export default function EditSuppModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.suppliers.currentPage);

  // Initialize state with extraObject values
  const [suppObj, setSuppObj] = useState({
    supplier_name: '',
    contact_name: '',
    contact_email: '',
    address: '',
    phone: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (extraObject) {
      setSuppObj({
        supplier_name: extraObject.supplier_name || '',
        contact_name: extraObject.contact_name || '',
        contact_email: extraObject.contact_email || '',
        address: extraObject.address || '',
        phone: extraObject.phone || '',
      });
    }
  }, [extraObject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuppObj((prev) => ({ ...prev, [name]: value }));
  };

  const saveSupplier = () => {
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    if (!suppObj.supplier_name.trim()) {
      setErrorMessage('Tên nhà cung cấp không được bỏ trống!');
    } else if (!suppObj.contact_name.trim()) {
      setErrorMessage('Tên liên lạc không được bỏ trống!');
    } else if (suppObj.contact_email && !validateEmail(suppObj.contact_email)) {
      setErrorMessage('Email không hợp lệ!');
    } else if (!suppObj.phone.trim()) {
      setErrorMessage('Số điện thoại không được bỏ trống!');
    } else {
      const updatedSupp = {
        ...extraObject,
        supplier_name: suppObj.supplier_name,
        contact_name: suppObj.contact_name,
        contact_email: suppObj.contact_email,
        address: suppObj.address,
        phone: suppObj.phone,
      };

      productService.putSupplier(extraObject.supplier_id, updatedSupp)
        .then((res) => {
          dispatch(showNotification({ message: 'Chỉnh sửa thông tin nhà cung cấp thành công!', status: 1 }));
          dispatch(fetchSuppliers({ currentPage, sizeItem: 5 }));
          closeModal();
        })
        .catch((err) => {
          console.error('Error:', err);
          dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
        });
    }
  };

  return (
    <>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Tên nhà cung cấp</span>
        </label>
        <input
          name="supplier_name"
          type="text"
          value={suppObj.supplier_name}
          onChange={handleChange}
          placeholder="Tên nhà cung cấp"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Tên liên lạc</span>
        </label>
        <input
          name="contact_name"
          type="text"
          value={suppObj.contact_name}
          onChange={handleChange}
          placeholder="Tên liên lạc"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Email</span>
        </label>
        <input
          name="contact_email"
          type="email"
          value={suppObj.contact_email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Địa chỉ</span>
        </label>
        <input
          name="address"
          type="text"
          value={suppObj.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Số điện thoại</span>
        </label>
        <input
          name="phone"
          type="text"
          value={suppObj.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="input input-bordered w-full"
        />
      </div>
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Hủy bỏ</button>
        <button className="btn btn-primary px-6" onClick={saveSupplier}>Lưu</button>
      </div>
    </>
  );
}

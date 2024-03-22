// EditUserModal.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';

export default function EditSuppModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [suppObj, setSuppObj] = useState({
    supplier_name: extraObject.supplier_name || '',
    contact_name: extraObject.contact_name || '',
    contact_email: extraObject.contact_email || '',
    address: extraObject.address || '',
    phone: extraObject.phone || '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setSuppObj((prev) => ({ ...prev, [updateType]: value }));
  };

  const saveNewSupp = () => {

    // Validation logic refactored
    if (!suppObj.supplier_name.trim()) {
        setErrorMessage('Họ tên không được bỏ trống!');
    } else if (!suppObj.contact_name.trim()) {
        setErrorMessage('contact_name không được bỏ trống!');
    } 
    else {
        // Proceed with saving operation if validation passes
        const newSupp = {
            ...extraObject,
            supplier_name: suppObj.supplier_name,
            contact_name: suppObj.contact_name,
            contact_email:  suppObj.contact_email,
            address:  suppObj.address,
            phone:  suppObj.phone,
        };
        productService.putSupplier(extraObject.supplier_id, newSupp)
            .then((res) => {
                dispatch(showNotification({ message: res?.data, status: 1 }));
                closeModal();
            })
            .catch((err) => {
                console.log('err: ', err);
                dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
            });
    }
};
  return (
    <>
      <InputText defaultValue={suppObj.supplier_name} updateType="supplier_name" labelTitle="Tên nhà cung cấp" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" defaultValue={suppObj.contact_name} updateType="contact_name" labelTitle="Tên liên lạc" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" defaultValue={suppObj.contact_email} updateType="contact_email" labelTitle="Email" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" defaultValue={suppObj.address} updateType="address" labelTitle="Địa chỉ" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" defaultValue={suppObj.phone} updateType="phone" labelTitle="Số điện thoại" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveNewSupp}>Save</button>
      </div>
    </>
  );
}

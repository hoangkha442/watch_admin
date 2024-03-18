// EditUserModal.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';

export default function EditCategoryModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [cateObj, setCateObj] = useState({
    category_name: extraObject.category_name || '',
    description: extraObject.description || ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setCateObj((prev) => ({ ...prev, [updateType]: value }));
  };

  const saveNewCate = () => {

    // Validation logic refactored
    if (!cateObj.category_name.trim()) {
        setErrorMessage('Họ tên không được bỏ trống!');
    } else if (!cateObj.description.trim()) {
        setErrorMessage('description không được bỏ trống!');
    } 
    else {
        // Proceed with saving operation if validation passes
        const newCate = {
            ...extraObject,
            category_name: cateObj.category_name,
            description: cateObj.description,
        };
        productService.upateCategory(extraObject.category_id, newCate)
            .then((res) => {
                dispatch(showNotification({ message: res?.data, status: 1 }));
                closeModal();
            })
            .catch((err) => {
                dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
            });
    }
};
  return (
    <>
      <InputText defaultValue={cateObj.category_name} updateType="category_name" labelTitle="Họ tên" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="description" defaultValue={cateObj.description} updateType="description" labelTitle="description" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveNewCate}>Save</button>
      </div>
    </>
  );
}

// EditUserModal.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';
import TextAreaInput from '../../../components/Input/TextAreaInput';

export default function EditProductModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const extraObject1 = extraObject[0];
  const [productObj, setProductObj] = useState({
    product_name: extraObject1.product_name || '',
    description: extraObject1.description || '',
    price: extraObject1.price || '',
    quantity_in_stock: extraObject1.quantity_in_stock || '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };

  const saveNewSupp = () => {
    // Validation logic refactored
    if (!productObj.product_name.trim()) {
        setErrorMessage('Tên sản phẩm không được bỏ trống!');
    } else if (!productObj.description.trim()) {
        setErrorMessage('Mô tả sản phẩm không được bỏ trống!');
    } else if (!productObj.price.trim()) {
        setErrorMessage('Giá sản phẩm không được bỏ trống!');
    } else if (!productObj.quantity_in_stock.trim()) {
        setErrorMessage('số lượng tồn không được bỏ trống!');
    } 
    else {
        // Proceed with saving operation if validation passes
        const newProduct = {
            ...extraObject1,
            product_name: productObj.product_name,
            description: productObj.description,
            price:  productObj.price * 1,
            quantity_in_stock:  productObj.quantity_in_stock * 1,
        };
        productService.putProduct(extraObject1.product_id, newProduct)
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
      <InputText defaultValue={productObj?.product_name} updateType="product_name" labelTitle="Tên sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <TextAreaInput defaultValue={productObj?.description} updateType="description" labelTitle="Thông tin mô tả" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText defaultValue={productObj?.price} updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText defaultValue={productObj?.quantity_in_stock} updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveNewSupp}>Save</button>
      </div>
    </>
  );
}

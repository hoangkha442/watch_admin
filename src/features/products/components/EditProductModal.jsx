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
  const [file, setFile] = useState(null)
  const [productObj, setProductObj] = useState({
    product_name: extraObject1.product_name || '',
    description: extraObject1.description || '',
    price: String(extraObject1.price) || '',
    quantity_in_stock: String(extraObject1.quantity_in_stock) || '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };
  const handleOnchange = (e) => { 
   let file = e.target.files[0]
   console.log('file: ', file);
   setFile(file)
  }

  async function saveNewSupp() {
    const errorMessage = validateProduct(productObj);
    
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
  
    try {
      const newProduct = {
        ...extraObject1,
        product_name: productObj.product_name,
        description: productObj.description,
        price: Number(productObj.price),
        quantity_in_stock: Number(productObj.quantity_in_stock),
      };
  
      await productService.putProduct(extraObject1.product_id, newProduct);
      await uploadProductImageIfPresent(file, extraObject1.product_id);
      
      dispatch(showNotification({ message: 'Cập nhật sản phẩm thành công!', status: 1 }));
      closeModal();
    } catch (err) {
      dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
    }
  }
  
  function validateProduct(productObj) {
    if (!productObj.product_name.trim()) {
      return 'Tên sản phẩm không được bỏ trống!';
    }
    if (!productObj.description.trim()) {
      return 'Mô tả sản phẩm không được bỏ trống!';
    }
    if (!productObj.price.trim()) {
      return 'Giá sản phẩm không được bỏ trống!';
    }
    if (!productObj.quantity_in_stock.trim()) {
      return 'Số lượng tồn không được bỏ trống!';
    }
    return null;
  }
  
  async function uploadProductImageIfPresent(file, productId) {
    if (file) {
      let formData = new FormData();
      formData.append('product_picture', file);
      await productService.putProductPicture(productId, formData);
    }
  }
  return (
    <>
      <InputText defaultValue={productObj?.product_name} updateType="product_name" labelTitle="Tên sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <TextAreaInput defaultValue={productObj?.description} updateType="description" labelTitle="Thông tin mô tả" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText defaultValue={productObj?.price} updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <div className={`form-control w-full mt-4`}>
            <label className="label">
                <span className={"label-text text-base-content "}>Hình ảnh</span>
            </label>
            <input type='file' accept='image/*' onChange={handleOnchange} className={"input  input-bordered w-full pt-2"}/>
      </div>
      <InputText defaultValue={productObj?.quantity_in_stock} updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveNewSupp}>Save</button>
      </div>
    </>
  );
}

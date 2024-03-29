// EditUserModal.js
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import { fetchProducts } from '../AsyncThunkAction';

export default function EditProductModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.products.currentPage);

  const [file, setFile] = useState(null)
  const [productObj, setProductObj] = useState({
    product_name: extraObject[0].product_name || '',
    description: extraObject[0].description || '',
    price: String(extraObject[0].price) || '',
    quantity_in_stock: String(extraObject[0].quantity_in_stock) || '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const extraObject[0] = extraObject[0];

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };
  const handleOnchange = (e) => { 
    setFile(e.target.files[0]);
  }

  async function saveProduct() {
    const errorMessage = validateProduct(productObj);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
    try {
      const newProduct = {
        ...extraObject[0],
        product_name: productObj.product_name,
        description: productObj.description,
        price: Number(productObj.price),
        quantity_in_stock: Number(productObj.quantity_in_stock),
      };

      await productService.putProduct(extraObject[0].product_id, newProduct);
      await uploadProductImageIfPresent(file, extraObject[0].product_id);
  
      dispatch(fetchProducts({ currentPage, sizeItem: 4 }));
      dispatch(showNotification({ message: 'Cập nhật sản phẩm thành công!', status: 1 }));
      closeModal();
    } catch (err) {
      dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
    }
  }
  
  function validateProduct(productObj) {
    if (!productObj.product_name.trim()) return 'Tên sản phẩm không được bỏ trống!';
    if (!productObj.description.trim()) return 'Mô tả sản phẩm không được bỏ trống!';
    if (!productObj.price.trim()) return 'Giá sản phẩm không được bỏ trống!';
    if (!productObj.quantity_in_stock.trim()) return 'Số lượng tồn không được bỏ trống!';
    return null;
  }
  
  const uploadProductImageIfPresent = async (file, productId) => {
    if (!file) return;
    
    let formData = new FormData();
    formData.append('product_picture', file);

    await productService.putProductPicture(productId, formData);
    dispatch(fetchProducts({ currentPage, sizeItem: 4 }));
  };
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
          <button className="btn btn-primary px-6" onClick={saveProduct}>Save</button>
        </div>
      </>
  );
}

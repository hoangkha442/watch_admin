import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { productService } from '../../../services/ProductService';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import { fetchProducts } from '../AsyncThunkAction';
import SelectBox from '../../../components/Input/SelectBox';

const INITIAL_PRODUCT_OBJ = {
  product_name: '',
  description: '',
  price: '',
  quantity_in_stock: '',
  category_id: 1,
  supplier_id: 1,
};

export default function EditProductModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.products.currentPage);

  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productObj, setProductObj] = useState({
    ...INITIAL_PRODUCT_OBJ,
    ...extraObject[0],
    price: String(extraObject[0].price),
    quantity_in_stock: String(extraObject[0].quantity_in_stock),
    });
  console.log('productObj: ', productObj);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoryResponse, supplierResponse] = await Promise.all([
          productService.getCategory(),
          productService.getSupplier(),
        ]);
        setCategories(categoryResponse.data.map(cat => ({
          name: cat.category_name,
          value: cat.category_id.toString(),
        })));
        setSuppliers(supplierResponse.data.map(sup => ({
          name: sup.supplier_name,
          value: sup.supplier_id.toString(),
        })));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    setExistingImages(extraObject[0].product_images || []);
  }, [extraObject]);
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj((prev) => ({ ...prev, [updateType]: value }));
  };
  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };
  const handleExistingImageChange = (e, index) => {
    const newImages = [...existingImages];
    newImages[index] = { ...newImages[index], file: e.target.files[0] };
    setExistingImages(newImages);
  };
  const addImageInput = () => {
    setFiles([...files, null]);
  };
  async function saveProduct() {
    const errorMessage = validateProduct(productObj);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }
    try {
      const newProduct = {
        
        product_name: productObj.product_name,
        description: productObj.description,
        price: Number(productObj.price),
        quantity_in_stock: Number(productObj.quantity_in_stock),
        category_id: Number(productObj.category_id),
        supplier_id: Number(productObj.supplier_id),
        };
      console.log('newProduct: ', newProduct);
      // Call update product API
      await productService.updateProduct(extraObject[0].product_id, newProduct);
      // Upload new product images if present
      await uploadProductImagesIfPresent(files, extraObject[0].product_id);
      // Update existing images if changed
      // await updateExistingImages(existingImages);

      // Fetch updated products
      dispatch(fetchProducts({ currentPage, sizeItem: 4 }));

      // Show success notification
      dispatch(showNotification({ message: 'Cập nhật sản phẩm thành công!', status: 1 }));
      closeModal();
    } catch (err) {
      console.log('err: ', err);
      // Show error notification
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

  const uploadProductImagesIfPresent = async (files, productId) => {
    if (!files || files.length === 0) return;

    let formData = new FormData();
    files.forEach((file, index) => {
      if (file) formData.append(`product_pictures[${index}]`, file);
    });

    await productService.updateProductPictures(productId, formData);
  };

  const updateExistingImages = async (images) => {
    for (const image of images) {
      if (image.file) {
        let formData = new FormData();
        formData.append('product_picture', image.file);
        await productService.updateProductImage(image.image_id, formData);
      }
    }
  };

  return (
    <>
      <InputText defaultValue={productObj?.product_name} updateType="product_name" labelTitle="Tên sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <TextAreaInput defaultValue={productObj?.description} updateType="description" labelTitle="Thông tin mô tả" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText defaultValue={productObj?.price} updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Hình ảnh hiện có</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={`http://localhost:8080/public/img/prds/${image.image_url}`} alt="Product" className="w-20 h-20 mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleExistingImageChange(e, index)}
                className="input input-bordered pt-1 h-8 w-[85px] text-xs px-1 text-center"
              />
            </div>
          ))}
        </div>
        <label className="label mt-4">
          <span className="label-text text-base-content">Thêm hình ảnh mới</span>
        </label>
        {files.map((file, index) => (
          <input
            key={index}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, index)}
            className="input input-bordered w-full pt-2 mb-2"
          />
        ))}
        <button type="button" onClick={addImageInput} className="btn btn-secondary mt-2">Thêm ảnh</button>
      </div>
      <InputText defaultValue={productObj?.quantity_in_stock} updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <div className="flex items-center gap-2">
        <SelectBox
          labelTitle="Danh mục sản phẩm"
          options={categories}
          updateType="category_id"
          updateFormValue={updateFormValue}
          containerStyle="mt-4 w-1/2"
          placeholder="Chọn một danh mục"
          value={productObj.category_id}
        />
        <SelectBox
          labelTitle="Nhà phân phối"
          options={suppliers}
          updateType="supplier_id"
          updateFormValue={updateFormValue}
          containerStyle="mt-4 w-1/2"
          placeholder="Chọn một nhà phân phối"
          value={productObj.supplier_id}
        />
      </div>
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveProduct}>Save</button>
      </div>
    </>
  );
}

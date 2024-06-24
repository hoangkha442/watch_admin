import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from "../../common/headerSlice";
import { productService } from "../../../services/ProductService";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import SelectBox from '../../../components/Input/SelectBox';
import { fetchProducts } from "../AsyncThunkAction";

const INITIAL_PRODUCT_OBJ = {
  product_picture: [],
  product_name: '',
  description: '',
  price: '',
  quantity_in_stock: '',
  category_id: 1,
  supplier_id: 1,
  promotion_percentage: '', // Added for promotion percentage
};

function AddNewProductModal({ closeModal }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.products.currentPage);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);

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

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj({ ...productObj, [updateType]: value });
  };

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const addImageInput = () => {
    setFiles([...files, null]);
  };

  const validateAndSaveProduct = async () => {
    // Validate files
    if (files.length === 0 || files.some(file => !file)) {
      return setErrorMessage("Hình ảnh không được bỏ trống");
    }

    // Validate product name
    if (!productObj.product_name.trim()) {
      return setErrorMessage("Tên sản phẩm không được bỏ trống!");
    }

    // Validate description
    if (!productObj.description.trim()) {
      return setErrorMessage("Mô tả sản phẩm không được bỏ trống!");
    }

    // Validate quantity in stock
    if (!productObj.quantity_in_stock.trim() || isNaN(productObj.quantity_in_stock) || parseInt(productObj.quantity_in_stock) < 0) {
      return setErrorMessage("Số lượng tồn kho phải là một số nguyên không âm!");
    }

    // Validate price
    if (!productObj.price.trim() || isNaN(productObj.price) || parseFloat(productObj.price) < 0) {
      return setErrorMessage("Giá sản phẩm phải là một số không âm!");
    }

    // Validate promotion percentage
    if (!productObj.promotion_percentage.trim() || isNaN(productObj.promotion_percentage) || parseFloat(productObj.promotion_percentage) < 0 || parseFloat(productObj.promotion_percentage) > 100) {
      return setErrorMessage("Phần trăm khuyến mãi phải là số trong khoảng 0-100!");
    }

    // All validations passed
    let formData = new FormData();
    files.forEach((file) => {
      formData.append('product_picture', file); // Ensure the field name matches
    });
    Object.entries(productObj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await productService.postProduct(formData);
      dispatch(showNotification({ message: 'Thêm sản phẩm thành công!', status: 1 }));
      dispatch(fetchProducts({ currentPage, sizeItem: 4 }));
      closeModal();
    } catch (error) {
      console.error('Error saving product', error);
      setErrorMessage('Có lỗi xảy ra khi lưu sản phẩm.');
    }
  };

  return (
    <>
      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Hình ảnh sản phẩm</span>
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
      <InputText updateType="product_name" labelTitle="Tên sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <TextAreaInput type="text" updateType="description" labelTitle="Mô tả sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="number" updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="number" updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="number" updateType="promotion_percentage" labelTitle="Phần trăm khuyến mãi" updateFormValue={updateFormValue} containerStyle="mt-4" placeholder="0-100" />
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
        <button className="btn btn-ghost" onClick={() => closeModal()}>Hủy bỏ</button>
        <button className="btn btn-primary px-6" onClick={() => validateAndSaveProduct()}>Lưu</button>
      </div>
    </>
  );
}

export default AddNewProductModal;

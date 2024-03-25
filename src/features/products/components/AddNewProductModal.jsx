import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { productService } from "../../../services/ProductService"
import TextAreaInput from "../../../components/Input/TextAreaInput"
import SelectBox from '../../../components/Input/SelectBox';
import { fetchProducts } from "../AsyncThunkAction"

const INITIAL_PRODUCT_OBJ = {
  product_picture: null,
  product_name: '',
  description: '',
  price: '',
  quantity_in_stock: '',
  category_id: 1,
  supplier_id: 1,
};

function AddNewProductModal({closeModal}){
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.products.currentPage);
    const [errorMessage, setErrorMessage] = useState("")
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ)
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
    
    const handleOnchange = (e) => {
        setFile(e.target.files[0]);
    };  

    const validateAndSaveProduct = async () => {
        if (!file) return setErrorMessage("Hình ảnh không được bỏ trống");
        if (!productObj.product_name.trim()) return setErrorMessage("Tên sản phẩm không được bỏ trống!");
        if (!productObj.description.trim()) return setErrorMessage("Mô tả sản phẩm không được bỏ trống!");
        if (!productObj.quantity_in_stock.trim()) return setErrorMessage("Số lượng tồn kho không được bỏ trống!");
        else{
            let formData = new FormData();
            formData.append('product_picture', file);
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
            }
        }
    }

    

    return(
        <>
            <div className={`form-control w-full mt-4`}>
                <label className="label">
                    <span className={"label-text text-base-content "}>Hình ảnh sản phẩm</span>
                </label>
                <input type='file' accept='image/*' onChange={handleOnchange} className={"input  input-bordered w-full pt-2"}/>
            </div>
            <InputText updateType="product_name" labelTitle="Tên sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
            <TextAreaInput type="text" updateType="description" labelTitle="Mô tả sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
            <InputText type="text" updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
            <InputText type="text" updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
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
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => validateAndSaveProduct ()}>Save</button>
            </div>
        </>
    )
}

export default AddNewProductModal

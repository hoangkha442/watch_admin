import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { productService } from "../../../services/ProductService"
import TextAreaInput from "../../../components/Input/TextAreaInput"
import SelectBox from '../../../components/Input/SelectBox';

const INITIAL_PRODUCT_OBJ = {
  product_picture: null,
  product_name: '',
  description: '',
  price: '',
  quantity_in_stock: '',
  category_id: '',
  supplier_id: '',
};

function AddNewProductModal({closeModal}){
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [suppliersRender, setsuppliersRender] = useState([])
    const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ)
    useEffect(() => { 
        productService.getCategory().then((res) => { 
            const formattedCategories = res.data.map(cat => ({
                name: cat.category_name,
                value: cat.category_id.toString(),
            }));
            setCategories(formattedCategories);
        }).catch(err => err)
        productService.getSupplier().then((res) => {
            const formattedsuppliersRender = res.data.map(sup => ({
                name: sup.supplier_name,
                value: sup.supplier_id.toString(),
            }));
            setsuppliersRender(formattedsuppliersRender)
        }).catch(err => err)
    }, [])

    const saveNewLead = () => {
        if(file == null)return setErrorMessage("Hình ảnh không được bỏ trống")
        else if(productObj.product_name.trim() === "")return setErrorMessage("Tên sản phẩm không được bỏ trống!")
        else if(productObj.description.trim() === "")return setErrorMessage("Mô tả sản phẩm không được bỏ trống!")
        else if(productObj.quantity_in_stock.trim() === "")return setErrorMessage("số lượng tồn kho không được bỏ trống!")
        else{
            let formData = new FormData()
            formData.append('product_picture', file)
            formData.append('product_name', productObj.product_name)
            formData.append('description', productObj.description)
            formData.append('price', Number(productObj.price))
            formData.append('quantity_in_stock', Number(productObj.quantity_in_stock))
            formData.append('category_id', Number(productObj.category_id))
            formData.append('supplier_id', Number(productObj.supplier_id))
            console.log('Number(productObj.category_id: ', Number(productObj.category_id))
            productService.postProduct(formData).then((res) => { 
                console.log('res: ', res);
            }).catch((err) => {
                console.log('err: ', err);
            })
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setProductObj({ ...productObj, [updateType]: value });
      };
    
    const handleOnchange = (e) => {
        let file = e.target.files[0];
        setFile(file);
    };

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
            <TextAreaInput type="text" updateType="price" labelTitle="Giá sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" />
            <InputText type="text" updateType="quantity_in_stock" labelTitle="Số lượng tồn kho" updateFormValue={updateFormValue} containerStyle="mt-4" />
            {/* <InputText type="text" updateType="category_id" labelTitle="Danh mục sản phẩm" updateFormValue={updateFormValue} containerStyle="mt-4" /> */}
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
                        options={suppliersRender} 
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
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddNewProductModal
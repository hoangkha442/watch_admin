import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { productService } from "../../../services/ProductService"
import { fetchCategories } from "../categorySlice"

const INITIAL_CATE_OBJ = {
    category_name : "",
    description : ""
}

function AddNewCategoryModal({closeModal}){
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [cateObj, setCateObj] = useState(INITIAL_CATE_OBJ)


    const saveNewLead = () => {
        if(cateObj.description.trim() === "")return setErrorMessage("Mô tả danh mục không được để trống!")
        else if(cateObj.category_name.trim() === "")return setErrorMessage("Tên danh mục không được để trống!")
        else{
            let newcateObj = {
                "category_name": cateObj.category_name,
                "description": cateObj.description
            }
            let {category_name, description} = newcateObj
            productService.postCategory({category_name, description}).then((res) => { 
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchCategories());
                closeModal()
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setCateObj({...cateObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue='' updateType="category_name" containerStyle="mt-4" labelTitle="Tên danh mục" updateFormValue={updateFormValue}/>

            <InputText type="description" defaultValue='' updateType="description" containerStyle="mt-4" labelTitle="Mô tả danh mục" updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Hủy bỏ</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Lưu</button>
            </div>
        </>
    )
}

export default AddNewCategoryModal
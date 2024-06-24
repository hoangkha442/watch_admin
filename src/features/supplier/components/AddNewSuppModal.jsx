import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { productService } from "../../../services/ProductService"
import { fetchSuppliers } from "../supplierSlice"

const INITIAL_SUPP_OBJ = {
    supplier_name : "",
    contact_name : "",
    contact_email: "",
    address: "",
    phone: ""
}

function AddNewSuppModal({closeModal}){
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const [suppObj, setSuppObj] = useState(INITIAL_SUPP_OBJ)


    const saveNewLead = () => {
        if(suppObj.contact_name.trim() === "")return setErrorMessage("tên liên hệ nhà không được để trống!")
        else if(suppObj.supplier_name.trim() === "")return setErrorMessage("Tên nhà cung cấp!")
        else if(suppObj.contact_email.trim() === "")return setErrorMessage("Email không được để trống!")
        else if(suppObj.address.trim() === "")return setErrorMessage("Địa không được để trống!")
        else if(suppObj.phone.trim() === "")return setErrorMessage("Số điện thoại không được để trống!")
        else{
            let newsuppObj = {
                "supplier_name": suppObj.supplier_name,
                "contact_name": suppObj.contact_name,
                "contact_email": suppObj.contact_email,
                "address": suppObj.address,
                "phone": suppObj.phone,
            }
            productService.postSupplier({...newsuppObj}).then((res) => { 
                dispatch(showNotification({message : res?.data, status : 1}))
                dispatch(fetchSuppliers());
                closeModal()
            }).catch((err) => { })
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setSuppObj({...suppObj, [updateType] : value})
    }

    return(
        <>

<InputText updateType="supplier_name" labelTitle="Tên nhà cung cấp" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" updateType="contact_name" labelTitle="Tên liên lạc" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" updateType="contact_email" labelTitle="Email" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" updateType="address" labelTitle="Địa chỉ" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="text" updateType="phone" labelTitle="Số điện thoại" updateFormValue={updateFormValue} containerStyle="mt-4" />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Hủy bỏ</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Lưu</button>
            </div>
        </>
    )
}

export default AddNewSuppModal
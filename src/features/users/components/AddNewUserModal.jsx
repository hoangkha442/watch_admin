import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import {userService} from '../../../services/UserService'
import { fetchUsers } from "../userSlice"

const INITIAL_LEAD_OBJ = {
    email : "",
    password : "",
    full_name : "",
    phone: ""
}

function AddUserModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)
    const currentPage = (useSelector(state => state.users.currentPage))

    const saveNewLead = () => {
        if(leadObj.full_name.trim() === "")return setErrorMessage("First Name is required!")
        else if(leadObj.email.trim() === "")return setErrorMessage("Email id is required!")
        else{
            let newLeadObj = {
                "email": leadObj.email,
                "password": leadObj.password,
                "full_name": leadObj.full_name,
                "phone": leadObj.phone,
            }
            let {email, password, full_name, phone} = newLeadObj
            userService.createUser({email: email, password: password, full_name: full_name, phone: phone, role: "customer"}).then((res) => { 
                dispatch(showNotification({message : "New User Added!", status : 1}))
                dispatch(fetchUsers({currentPage, sizeItem: 5}))
                closeModal()
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>

            <InputText type="password" defaultValue={leadObj.password} updateType="password" containerStyle="mt-4" labelTitle="Mật khẩu" updateFormValue={updateFormValue}/>

            <InputText type="email" defaultValue={leadObj.full_name} updateType="full_name" containerStyle="mt-4" labelTitle="Họ tên" updateFormValue={updateFormValue}/>
            <InputText type="email" defaultValue={leadObj.phone} updateType="phone" containerStyle="mt-4" labelTitle="Số điện thoại" updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddUserModalBody
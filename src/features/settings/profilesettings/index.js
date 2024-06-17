import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import { fetchUser } from "../../users/userSlice"
import ErrorText from "../../../components/Typography/ErrorText"
import { userService } from "../../../services/UserService"

function ProfileSettings(){
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({})
    const dispatch = useDispatch()
    useEffect(() => { 
        dispatch(fetchUser())
    }, [dispatch])
    useEffect(() => { 
        userService.getMyInfor().then((res) => { 
            setUser(res.data)
         })
     }, [])
    const [userObj, setuserObj] = useState();
    useEffect(() => {
        if (user) {
          setuserObj({
            full_name: user.full_name || '',
            email: user.email || '',
            password: user.password || '', 
            phone: user.phone || '',
          });
        }
    }, [user]);

  const updateFormValue = (e) => {
    const { name, value } = e.target;
    setuserObj(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrorMessage('');
  };
      
    // Call API to update profile settings changes
    const updateProfile = () => {
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        // Validation logic refactored
        if (!userObj.full_name.trim()) {
            setErrorMessage('Họ tên không được bỏ trống!');
        } else if (!userObj.email.trim()) {
            setErrorMessage('Email không được bỏ trống!');
        } else if (!validateEmail(userObj.email)) {
            setErrorMessage('Email không hợp lệ!');
        } else if (!userObj.password.trim()) {
            setErrorMessage('Mật khẩu không được bỏ trống!');
        } else if (!userObj.phone.trim()) {
            setErrorMessage('Số điện thoại không được bỏ trống!');
        } 
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }
    return(
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText defaultValue={userObj?.full_name} updateType="full_name" labelTitle="Họ tên" updateFormValue={updateFormValue} containerStyle="mt-4" />
                <InputText type="email" defaultValue={userObj?.email} updateType="email" labelTitle="Email" updateFormValue={updateFormValue} containerStyle="mt-4" />
                <InputText type="password" defaultValue='' placeholder='***********' updateType="password" labelTitle="Mật khẩu" updateFormValue={updateFormValue} containerStyle="mt-4" />
                <InputText defaultValue={userObj?.phone} updateType="phone" labelTitle="Số điện thoại" updateFormValue={updateFormValue} containerStyle="mt-4" />
                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                </div>
                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default ProfileSettings

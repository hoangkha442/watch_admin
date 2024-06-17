
import {useState, useRef, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { Auth } from '../../services/Auth'
import { adminLocalStorage } from '../../services/LocalService'
import { notification } from 'antd';
function Login(){

    const INITIAL_LOGIN_OBJ = {
        password : "123",
        email : "kha@gmail.com"
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)
    const [isLogin, setIsLogin] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.email.trim() === "")return setErrorMessage("Email Id is required!")
        if(loginObj.password.trim() === "")return setErrorMessage("Password is required!")
        else{
            Auth.login(loginObj).then((res) => {
                adminLocalStorage.set(res.data?.token);
                setIsLogin(true)
                setLoading(true)
                openNotificationWithIcon('success', 'Đăng nhập thành công!', 'Chào mừng bạn đến với trang quản lý M-Equipment.')
                setTimeout(() => {
                    navigate('/app/dashboard')
                    window.location.reload()
                }, 1500);                                    
            })
            .catch((err) => { 
                setLoading(false)
                openNotificationWithIcon('error', 'Đăng nhập thất bại!', err.response?.data?.message);
            })
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLoginObj({...loginObj, [updateType] : value})
    }
    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Đăng nhập</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">
                            <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
                            <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Mật khẩu" updateFormValue={updateFormValue}/>
                        </div>

                        <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Quên mật khẩu?</span></Link>
                        </div>
                        {contextHolder}
                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit"  className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Đăng nhập</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
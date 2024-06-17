import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice';
import { Auth } from '../../services/Auth';

export function useAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        Auth.verifyToken().then((res) => { 
            if (res?.data == false) {
                dispatch(showNotification({message : "Phiên bản đăng nhập hết hạn.", status : 1}))
                navigate('/login');
            }
        }).catch((err) =>  err )
    }, [navigate]); 
}

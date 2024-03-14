import React from 'react'
import { useDispatch } from 'react-redux';
import { showNotification } from '../headerSlice';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { userService } from '../../../services/UserService';

export default function ConfirmHiddenUserModalBody({ extraObject, closeModal }) {
    const dispatch = useDispatch();

    const { message, type, index } = extraObject;
    const user_id = index 
    const proceedWithYes = async () => {
        if(type === CONFIRMATION_MODAL_CLOSE_TYPES.USER_HIDDEN){
            userService.hiddenUser(user_id).then((res) => { 
                dispatch(showNotification({message : "Đã ẩn người dùng thành công", status : 1}))
            })
            .catch((err) => { 
                console.log('err: ', err);
            })
        }
        closeModal()
    };

    return (
        <>
            <p className='text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>
            </div>
        </>
    );
}

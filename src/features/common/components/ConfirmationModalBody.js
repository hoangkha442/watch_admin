import { useDispatch } from 'react-redux';
import { showNotification } from '../headerSlice';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { userService } from '../../../services/UserService';

function ConfirmationModalBody({ extraObject, closeModal }) {
    console.log('closeModal: ', closeModal);
    console.log('extraObject: ', extraObject);
    const dispatch = useDispatch();

    const { message, type, index } = extraObject;

    const proceedWithYes = async () => {
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
            userService.deleteUser(index).then((res) => { 
                console.log('res: ', res);
            })
            .catch((err) => { 
                console.log('err: ', err);

             })
        }
    };

    return (
        <>
            <p className='text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={() => closeModal()}>Hủy bỏ</button>
                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>
            </div>
        </>
    );
}

export default ConfirmationModalBody;

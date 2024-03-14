import { useDispatch } from 'react-redux';
import { deleteUser } from '../../leads/leadSlice'; // Import deleteUser action from leadSlice
import { showNotification } from '../headerSlice';

function ConfirmationModalBody({ extraObject, closeModal }) {
    const dispatch = useDispatch();

    const { message, type, index } = extraObject;

    const proceedWithYes = async () => {
        if (type === 'LEAD_DELETE') {
            try {
                await dispatch(deleteUser(index));
                dispatch(showNotification({ message: 'Đã xóa người dùng!', status: 1 }));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
        closeModal();
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

export default ConfirmationModalBody;

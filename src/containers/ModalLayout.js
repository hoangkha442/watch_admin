import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import ConfirmHiddenUserModalBody from '../features/common/components/ConfirmHiddenUserModalBody'
import EditUserModal from '../features/users/components/EditUserModal'
import EditCategoryModal from '../features/productCategories/components/EditCategoryModal'
import AddNewCategoryModal from '../features/productCategories/components/AddNewCategoryModal'
import EditSuppModal from '../features/supplier/components/EditSuppModal'
import AddNewSuppModal from '../features/supplier/components/AddNewSuppModal'
import EditProductModal from '../features/products/components/EditProductModal'
import AddNewProductModal from '../features/products/components/AddNewProductModal'
import AddUserModalBody from '../features/users/components/AddNewUserModal'


function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.USER_ADD_NEW] : <AddUserModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.USER_EDIT] : <EditUserModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmHiddenUserModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
                {
                    {
                             [MODAL_BODY_TYPES.CATE_EDIT] : <EditCategoryModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CATE_ADD_NEW] : <AddNewCategoryModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
                {
                    {
                             [MODAL_BODY_TYPES.SUPP_EDIT] : <EditSuppModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.SUPP_ADD_NEW] : <AddNewSuppModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
                {
                    {
                             [MODAL_BODY_TYPES.PRODUCT_EDIT] : <EditProductModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PRODUCT_ADD_NEW] : <AddNewProductModal closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout
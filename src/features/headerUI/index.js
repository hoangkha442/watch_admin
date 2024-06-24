import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard.js"
import { openModal } from "../common/modalSlice.js"
import { UserOutlined } from '@ant-design/icons';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil.js'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice.js'
import { userService } from "../../services/UserService.jsx"
import { Avatar, Pagination, Popconfirm } from "antd"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm người dùng mới", bodyType : MODAL_BODY_TYPES.USER_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Thêm mới</button>
        </div>
    )
}

function HeaderUI(){
    return(
        <>
            <TitleCard title="Chỉnh sửa trang Header" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="">Chỉnh sửa header ở đây</div>
            </TitleCard>
        </>
    )
}


export default HeaderUI
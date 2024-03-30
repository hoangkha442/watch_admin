import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { UserOutlined } from '@ant-design/icons';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'
import { showNotification } from '../common/headerSlice'
import { userService } from "../../services/UserService.jsx"
import { Avatar, Pagination} from "antd"
import { fetchUsers, setCurrentPage } from "./userSlice.js"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm người dùng mới", bodyType : MODAL_BODY_TYPES.USER_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}

function Users(){
    const currentPage = useSelector((state) => state.users.currentPage);
    const users = useSelector((state) => state.users.users);
    const [sizeItem, setSizeItem] = useState(5);
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUsers({ currentPage, sizeItem }));
    }, [dispatch, currentPage]);
    const onChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };


    const getStatus = (index) => {
        if(index === false)return <div className="font-medium py-3 px-5 badge badge-accent">Hiện</div>
        else return <div className="badge badge-ghost font-medium py-3 px-5">Ẩn</div>
    }


    const deleteCurrentUser = (index) => {
        dispatch(openModal({title : "Xác nhận", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn xóa người dùng này không?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE, index}}))
    }
    const hiddenUsers = (index) => {
        dispatch(openModal({title : "Xác nhận", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn ẩn người dùng này không?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.USER_HIDDEN, index}}))
    }

    const openEditModal = (uID) => {
        userService.getUserID(uID).then((res) => { 
            dispatch(openModal({title : "Chỉnh sửa người dùng", bodyType : MODAL_BODY_TYPES.USER_EDIT, extraObject: res?.data}))
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    }

    return( 
        <>
            <TitleCard title="Người dùng hiện tại" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Đăng nhập lần cuối</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                           users?.data?.map((user, k) => { 
                                return(
                                    <tr key={user?.user_id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        {user?.avatar == null ? <Avatar icon={<UserOutlined />} /> : <img src={user?.avatar} alt="Avatar" />}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user?.full_name}</div>
                                                    <div className="text-sm opacity-50">{user?.last_name}lastname</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user?.email}</td>
                                        <td>{moment(user?.creation_date).format('DD MMM YYYY')}</td>
                                        <td>
                                            <button onClick={() => { hiddenUsers(user?.user_id)}}>{getStatus(user?.is_visible)}</button>
                                        </td>
                                        <td>{user?.last_login_date == null ? "Chưa cập nhật!" :  moment(user?.last_login_date).format('DD MMM YYYY')}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentUser(user?.user_id)}><TrashIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => openEditModal(user?.user_id)}><PencilSquareIcon className="w-5"/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <Pagination defaultCurrent={1} current={currentPage} onChange={onChange} total={users?.totalPage * 10}/>

            </div>
            </TitleCard>
        </>
    )
}


export default Users
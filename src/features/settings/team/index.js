import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import { fetchAdmin, setCurrentPage } from "./teamSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"
import { openModal } from "../../common/modalSlice"
import { Pagination } from "antd"
import { BASE_URL_IMG_USER } from "../../../services/config"

// import { useAuth } from "../../hook/useAuth"

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const addNewTeamMember = () => {
        dispatch(showNotification({message : "Add New Member clicked", status : 1}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => addNewTeamMember()}>Invite New</button>
        </div>
    )
}




function Team(){
    const currentPage = useSelector((state) => state.teams.currentPage);
    const teams = useSelector((state) => state.teams.admin);
    const [sizeItem, setSizeItem] = useState(5);
    const dispatch = useDispatch()
    const getStatus = (index) => {
        if(index === false)return <div className="font-medium py-3 px-5 badge badge-accent">Hiện</div>
        else return <div className="badge badge-ghost font-medium py-3 px-5">Ẩn</div>
    }
    useEffect(() => {
      dispatch(fetchAdmin({ currentPage, sizeItem }));
    }, [dispatch, currentPage]);

    const onChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const getRoleComponent = (role) => {
        if(role  === "admin")return <div className="badge badge-secondary">{role}</div>
    }
    

    const hiddenUsers = (index) => {
        dispatch(openModal({title : "Xác nhận", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Bạn có muốn ẩn người dùng này không?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.USER_HIDDEN, index}}))
    }

    return(
        <>
            
            <TitleCard title="Active Members" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Tham gia vào ngày</th>
                        <th>Vai trò</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            teams?.data?.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={BASE_URL_IMG_USER +  l?.avatar} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l?.full_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l?.email}</td>
                                    <td>{moment(l?.creation_date).format("DD MMM YYYY")}</td>
                                    <td>{getRoleComponent(l?.role)}</td>
                                    <td>
                                            <button onClick={() => { hiddenUsers(l?.user_id)}}>{getStatus(l?.is_visible)}</button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <Pagination defaultCurrent={1} current={currentPage} onChange={onChange} total={teams?.totalPage * 10}/>
            </div>
            </TitleCard>
        </>
    )
}


export default Team
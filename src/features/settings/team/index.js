import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import { fetchAdmin } from "./teamSlice"
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
    useEffect(() => {
      dispatch(fetchAdmin({ currentPage, sizeItem }));
    }, [dispatch, currentPage]);


    const getRoleComponent = (role) => {
        if(role  === "admin")return <div className="badge badge-secondary">{role}</div>
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
                        <th>Đăng nhập lần cuối</th>
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
                                                    <img src={l?.avatar} alt="Avatar" />
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
                                    <td>{l?.lastActive}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Team
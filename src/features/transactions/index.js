import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import { fetchTransaction } from "./transactionSlice"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import ViewfinderCircleIcon from '@heroicons/react/24/outline/ViewfinderCircleIcon'
import { productService } from "../../services/ProductService"
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import { openModal } from "../common/modalSlice"


const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if(searchText == ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
        }
    }, [searchText])

    return(
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
            
        </div>
    )
}


function Transactions(){

    const transactions = useSelector((state) => state.transactions.transactions);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);
     const [trans, setTrans] = useState(transactions)

    const removeFilter = () => {
        setTrans(transactions)
    }

    const applyFilter = (params) => {
        let filteredTransactions = transactions.filter((t) => {return t.orders.users.full_name == params})
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = transactions.filter((t) => {return t.orders.users.email.toLowerCase().includes(value.toLowerCase()) ||  t.orders.users.email.toLowerCase().includes(value.toLowerCase())})
        setTrans(filteredTransactions)
    }

    const openViewModal = (pId) => {
        productService.getPaymentId(pId).then((res) => { 
            dispatch(openModal({title : "Chi tiết giao dịch", bodyType : MODAL_BODY_TYPES.VIEW_PAYMENT, extraObject: res?.data}))
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    }

    return(
        <>
            
            <TitleCard title="Giao dịch gần đây" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>

                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email Id</th>
                        <th>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Ngày giao dịch</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            trans?.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    {l.orders.users?.avatar == null ? <Avatar className="w-full h-full" icon={<UserOutlined />} /> : <img src={l.orders.users.avatar} alt="Avatar" />}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.orders.users.full_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.orders.users?.email}</td>
                                    <td>{l.payment_method}</td>
                                    <td>{l.amount.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{moment(l.payment_date).format("D MMM YYYY")}</td>
                                    <td><button className="badge badge-ghost font-medium py-3 px-5" onClick={() => openViewModal(l.payment_id)}><ViewfinderCircleIcon className="w-5"/></button></td>
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


export default Transactions
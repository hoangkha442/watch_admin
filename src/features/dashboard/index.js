import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useEffect, useState } from 'react'
import { userService } from '../../services/UserService'
import { productService } from '../../services/ProductService'


function Dashboard(){
    const [user, setUser] = useState()
    const [order, setOrder] = useState()
    const [totalOrder, setTotalOrder] = useState()
    const [countOrderByUserId, setCountOrderByUserId] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [admin, setAdmin] = useState()
    const [customer, setCustomer] = useState()
    useEffect(() => { 
        userService.getUser().then((res) => { 
            setUser(res.data)
            let adminCount = 0;
            let customerCount = 0;
            res.data.forEach(user => {
                if (user.role === 'admin') {
                  adminCount++;
                } else if (user.role === 'customer') {
                  customerCount++;
                }
            });
            setAdmin(adminCount)
            setCustomer(customerCount)
         })
        productService.getOrder().then((res) => { 
            console.log('res: ', res.data);

            setTotalOrder(res.data)


            let sumDelivered = res.data.reduce((sum, order) => {
                return order.status === 'delivered' ? sum + order.total_amount : sum;
            }, 0);
            setTotalAmount(sumDelivered)

            let filteredOrders = res.data.filter(order => order.status !== 'delivered');
            setOrder(filteredOrders)

            let uniqueUserIds = new Set();
            res.data.forEach(order => {
                uniqueUserIds.add(order.user_id);
            });
            let uniqueUserIdsCount = uniqueUserIds.size;
            setCountOrderByUserId(uniqueUserIdsCount)


         })
    }, [])
    const statsData = [
        {title : "Tổng tài khoản", value : user?.length, icon : <UserGroupIcon className='w-8 h-8'/>, description : `${admin} Admin - ${customer} Customer`},
        {title : "Tổng doanh thu", value : totalAmount, icon : <CreditCardIcon className='w-8 h-8'/>, description : "Tháng này"},
        {title : "Đang chờ xử lí", value : order?.length, icon : <CircleStackIcon className='w-8 h-8'/>, description : `Trên ${totalOrder?.length} đơn hàng`},
        {title : "Người dùng đã order", value : countOrderByUserId, icon : <UsersIcon className='w-8 h-8'/>, description : `Trên ${customer} người dùng`},
    ]
    const dispatch = useDispatch()
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>



        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>
            
        {/** ---------------------- Different stats content 2 ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div>

        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Dashboard
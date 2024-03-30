import { useEffect, useState } from "react"
import {userService} from '../../../services/UserService'
import TitleCard from "../../../components/Cards/TitleCard"
import { productService } from "../../../services/ProductService"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL_IMG_PRD } from "../../../services/config"
import moment from "moment"



function ViewPaymentModal({closeModal, extraObject}){
    const [orderObj, setOrderObj] = useState()
    const [user, setUser] = useState()
    useEffect(() => { 
        productService.getOrderDetailId(extraObject.orders.user_id).then((res) => { 
            setOrderObj(res.data[0])
        }).catch(err => err)    
        userService.getUserID(extraObject.orders.user_id).then((res) => {
            console.log('res: ', res);
            setUser(res.data)
        })
    }, [])

    return(
        <>  
            <TitleCard
                title={orderObj?.products?.product_name}
                topMargin="mt-2" 
            >
                <div className="flex items-center gap-4">
                    <div className="rounded-lg w-40 h-40">
                        {orderObj?.products?.product_picture == null ? <Avatar className="w-full h-full" icon={<UserOutlined />} /> : <img className="object-cover rounded-xl w-full h-full" src={BASE_URL_IMG_PRD + orderObj?.products?.product_picture} alt="Avatar" />}
                    </div>
                    <div className="">
                        <p>{orderObj?.products?.description}</p>
                        <p className="text-sm">{orderObj?.products?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        <p className="text-sm">x{orderObj?.quantity}</p>
                        <p className="text-end">{(orderObj?.products?.price * orderObj?.quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    </div>
                </div>
                <div className="mt-6 italic">
                   <p>
                   Transaction by  <span>{user?.full_name}</span>
                   </p>
                   <p>
                   Email:  <span>{user?.email}</span>
                   </p>
                   <p>
                   Order date:  <span>{moment(orderObj?.orders?.order_date).format("D MMM YYYY")}</span>
                   </p>
                </div>
            </TitleCard>
            
        </>
    )
}

export default ViewPaymentModal
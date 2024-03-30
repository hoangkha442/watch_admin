
import { useEffect, useState } from "react";
import { userService } from '../../../services/UserService';
import TitleCard from "../../../components/Cards/TitleCard";
import { productService } from "../../../services/ProductService";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL_IMG_PRD } from "../../../services/config";
import moment from "moment";

function ViewPaymentModal({ closeModal, extraObject }) {
    const [orderObj, setOrderObj] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        productService.getOrderDetailId(extraObject.orders.user_id).then(res => {
            setOrderObj(res.data[0]);
        }).catch(err => console.error(err));

        userService.getUserID(extraObject.orders.user_id).then(res => {
            setUser(res.data);
        }).catch(err => console.error(err));
    }, [extraObject.orders.user_id]);

    return (
        <div className="modal-content-container">
            <TitleCard title={orderObj?.products?.product_name} topMargin="mt-2">
                <div className="flex flex-col md:flex-row items-center gap-6 p-4  shadow-lg rounded-lg">
                    <div className="flex-none rounded-lg w-36 h-36 overflow-hidden">
                        {orderObj?.products?.product_picture == null ? 
                            <Avatar className="w-full h-full" icon={<UserOutlined />} /> : 
                            <img className="object-cover rounded-lg w-full h-full" src={BASE_URL_IMG_PRD + orderObj?.products?.product_picture} alt="Product" />}
                    </div>
                    <div className="flex-grow">
                        <p className="text-lg font-semibold">{orderObj?.products?.product_name}</p>
                        <p className="text-gray-600">{orderObj?.products?.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm font-medium ">{orderObj?.products?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            <p className="text-sm font-medium text-gray-500">x{orderObj?.quantity}</p>
                            <p className="text-lg font-bold text-purple-600">{(orderObj?.products?.price * orderObj?.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="py-2 px-4 border border-purple-500 rounded-lg inline-block">
                        <span className="font-semibold">{user?.full_name}</span> - <span>{user?.email}</span> - <span>{moment(orderObj?.orders?.order_date).format("D MMM YYYY")}</span>
                    </p>
                </div>
            </TitleCard>
        </div>
    );
}

export default ViewPaymentModal;

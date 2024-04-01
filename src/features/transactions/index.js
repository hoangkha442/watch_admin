import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import TitleCard from '../../components/Cards/TitleCard';
import SearchBar from '../../components/Input/SearchBar';
import { fetchTransaction } from './transactionSlice';
import { openModal } from '../common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import ViewfinderCircleIcon from '@heroicons/react/24/outline/ViewfinderCircleIcon';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { productService } from '../../services/ProductService';

// Dummy FILTER_OPTIONS for demonstration
const FILTER_OPTIONS = ['Ngân hàng', 'Thanh toán khi nhận hàng'];

const TopSideButtons = ({ setSearchText, applyFilter, removeFilter, filterParam }) => {
    const showFiltersAndApply = (filter) => {
        applyFilter(filter);
    };

    const removeAppliedFilter = () => {
        removeFilter();
    };

    return (
        <div className="flex justify-end items-center gap-4">
            <SearchBar placeholderText={'Search email ...'} setSearchText={setSearchText} />
            {filterParam && (
                <button onClick={removeAppliedFilter} className="btn btn-xs btn-active btn-ghost normal-case">
                    {filterParam} <XMarkIcon className="w-4 h-4 ml-2" />
                </button>
            )}
            <div className="dropdown dropdown-end">
                <label tabIndex={1} className="btn btn-sm btn-outline flex items-center">
                    <FunnelIcon className="w-5 h-5 mr-2"/>Filter
                </label>
                <ul tabIndex={2} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52  z-10">
                    {FILTER_OPTIONS.map((option, index) => (
                        <li key={index}><a onClick={() => showFiltersAndApply(option)}>{option}</a></li>
                    ))}
                    <div className="divider my-2"></div>
                    <li><a onClick={removeAppliedFilter}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    );
};

function Transactions() {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.transactions);
    const [searchText, setSearchText] = useState('');
    const [filterParam, setFilterParam] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);

    useEffect(() => {
        let result = transactions.filter(transaction => {
            return (!filterParam || transaction.payment_method === filterParam) &&
                   (!searchText || transaction.orders.users.email.toLowerCase().includes(searchText.toLowerCase()) ||
                    transaction.orders.users.full_name.toLowerCase().includes(searchText.toLowerCase()));
        });
        setFilteredTransactions(result);
    }, [transactions, searchText, filterParam]);

    const applyFilter = (filter) => {
        setFilterParam(filter);
    };

    const removeFilter = () => {
        setFilterParam('');
    };

    const openViewModal = (paymentId) => {
        productService.getPaymentId(paymentId).then((res) => {
            dispatch(openModal({ title: "Chi tiết giao dịch", bodyType: MODAL_BODY_TYPES.VIEW_PAYMENT, extraObject: res.data }));
        }).catch((err) => {
            console.error('Error fetching payment details:', err);
        });
    };

    return (
        <>
            <TitleCard 
                title="Giao dịch gần đây" 
                topMargin="mt-2"
                TopSideButtons={
                    <TopSideButtons 
                        setSearchText={setSearchText} 
                        applyFilter={applyFilter} 
                        removeFilter={removeFilter} 
                        filterParam={filterParam} 
                    />
                }
            >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email Id</th>
                                <th>Phương thức thanh toán</th>
                                <th>Tổng tiền</th>
                                <th>Ngày giao dịch</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    {transaction.orders.users.avatar ?
                                                        <img src={transaction.orders.users.avatar} alt="Avatar" /> :
                                                        <Avatar className="w-full h-full" icon={<UserOutlined />} />}
                                                </div>
                                            </div>
                                            <div>{transaction.orders.users.full_name}</div>
                                        </div>
                                    </td>
                                    <td>{transaction.orders.users.email}</td>
                                    <td>{transaction.payment_method}</td>
                                    <td>{transaction.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{moment(transaction.payment_date).format("D MMM YYYY")}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline" onClick={() => openViewModal(transaction.payment_id)}>
                                            <ViewfinderCircleIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </TitleCard>
        </>
    );
}

export default Transactions;


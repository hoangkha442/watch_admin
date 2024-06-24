import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OrderCanceled from '../../features/orderCanceled'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Đơn hàng hủy"}))
      }, [])


    return(
        <OrderCanceled />
    )
}

export default InternalPage
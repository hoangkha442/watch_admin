import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OrderShipped from '../../features/orderShipped'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Đang giao"}))
      }, [])


    return(
        <OrderShipped />
    )
}

export default InternalPage
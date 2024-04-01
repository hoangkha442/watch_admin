import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OrderShipped from '../../features/orderShipped'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Shipped"}))
      }, [])


    return(
        <OrderShipped />
    )
}

export default InternalPage
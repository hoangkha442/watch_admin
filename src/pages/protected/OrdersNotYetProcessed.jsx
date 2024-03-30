import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OrdersNotYetProcessed from '../../features/ordersNotYetProcessed'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Orders"}))
      }, [])


    return(
        <OrdersNotYetProcessed />
    )
}

export default InternalPage
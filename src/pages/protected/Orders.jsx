import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Orders from '../../features/orders'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Đã giao"}))
      }, [])


    return(
        <Orders />
    )
}

export default InternalPage
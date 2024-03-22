import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Suppliers from '../../features/supplier'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Nhà cung cấp"}))
      }, [])
    return(
        <Suppliers/>
    )
}

export default InternalPage
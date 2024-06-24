import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import HeaderUI from '../../features/headerUI/index'

function InternalPage(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Giao diện Header"}))
      }, [])


    return(
        <HeaderUI />
    )
}

export default InternalPage
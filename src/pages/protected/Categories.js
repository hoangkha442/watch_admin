import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Categories from '../../features/productCategories'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh mục"}))
      }, [])


    return(
        <Categories />
    )
}

export default InternalPage
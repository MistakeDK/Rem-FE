import React, { useEffect, useState } from 'react'
import FormProduct from '~/component/FormProduct'
import { formProduct, category } from '~/config/Types'
import CategoryService from '~/service/CategoryService'

function CreateProduct() {
    const [category, SetCategory] = useState<category[]>([])
    useEffect(() => {
        CategoryService.getList().then((res) => {
            SetCategory(res.data.result.items)
        })
    }, [])
    return (
        category.length > 0 && <FormProduct category={category}></FormProduct>
    )
}

export default CreateProduct
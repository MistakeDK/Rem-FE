import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FormProduct from '~/component/FormProduct'
import { formProduct, category } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import ProductService from '~/service/ProductService'

function EditProduct() {
    const id = useLocation().pathname.split("/").pop()
    const [formProduct, SetFormProduct] = useState<formProduct>()
    const [category, SetCategory] = useState<category[]>([])

    useEffect(() => {
        ProductService.getById(id as string).then((res) => {
            SetFormProduct(res.data.result)
        })
        CategoryService.getList().then((res) => {
            SetCategory(res.data.result.items)
        })
    }, [])

    return (
        formProduct && category && <FormProduct product={formProduct} category={category} ></FormProduct>
    )
}

export default EditProduct
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FormProduct from '~/component/FormProduct'
import { formProduct, category } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import ProductService from '~/service/ProductService'

function EditProduct() {
    const id = useLocation().pathname.split("/").pop()
    const [formProduct, SetFormProduct] = useState<formProduct>()
    useEffect(() => {
        ProductService.getById(id as string).then((res) => {
            SetFormProduct(res.data.result)
        })
        console.log(formProduct)
    }, [])

    return (
        formProduct && <FormProduct product={formProduct} ></FormProduct>
    )
}

export default EditProduct
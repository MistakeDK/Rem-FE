import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, InputNumber, Select, Upload, UploadProps, message } from 'antd'
import { Option } from 'antd/es/mentions'
import React, { useEffect, useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { formProduct, category } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import ProductService from '~/service/ProductService'



type FormProps = {
    product?: formProduct
}
function FormProduct({ product }: FormProps,) {
    const navigate = useNavigate()
    const [category, SetCategory] = useState<category[]>([])
    console.log(product)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<formProduct>(
        {
            defaultValues: product ? {
                categoryId: product.categoryId,
                description: product.description,
                name: product.name,
                price: product.price,
                isActive: product.isActive,
                img: product.img,
                id: product.id,
                isHot: product.isHot,
                isNew: product.isNew
            } : undefined
        })
    useEffect(() => {
        CategoryService.getList().then((res) => {
            SetCategory(res.data.result)
        })
    }, [])
    const renderOption = () => {
        return category.map((index) => {
            return (
                <option value={index.id}>{index.name}</option>
            )
        })
    }
    const props: UploadProps = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || 'image/jpg';
            if (!isPNG) {
                message.error(`${file.name} không phải là file png hoặc file jpg`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        maxCount: 1,
        onChange: (info) => {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} upload thành công`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} upload thất bại`);
            }
        },
        customRequest: ({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);

            ProductService.uploadImg(formData)
                .then((res) => {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                    setValue("img", res.data.url)

                })
                .catch((err) => {
                    if (onError) {
                        onError(err);
                    }

                });
        },
    };
    const onSubmit = (value: formProduct) => {
        if (product) {
            ProductService.edit(product.id, value).then((res) => {

                message.success("Chỉnh sửa thành công")
            }).catch(() => {
                message.error("Chỉnh sửa thất bại")
            })
        } else {
            ProductService.create(value).then((res) => {
                message.success("Tạo sản phẩm mới thành công")
            }).catch(() => {
                message.error("Tạo mới thất bại")
            })
        }
        navigate("/admin/product/ListProduct")
    }
    const validateName: RegisterOptions<formProduct, "name"> = {
        required: "Vui lòng nhập tên"
    }
    const validatePrice: RegisterOptions<formProduct, "price"> = {
        required: "Vui lòng nhập số tiền",
        min: {
            value: 10000,
            message: "Số tiền phải lớn hơn 100000"
        }
    }
    const validateDes: RegisterOptions<formProduct, "description"> = {
        required: "Vui lòng nhập mô tả",
        max: {
            value: 256,
            message: "Không thể vượt quá 256 ký tự"
        }
    }
    const validateCategory: RegisterOptions<formProduct, "categoryId"> = {
        required: "Vui lòng chọn phân loại"
    }
    const validateImg: RegisterOptions<formProduct, "img"> = {
        required: "Vui lòng chọn hình"
    }
    return (
        <div className='m-20'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 w-8/12 gap-4'>
                    <div className='flex flex-col space-y-8 text-xl items-end'>
                        <label>Tên sản phẩm:</label>
                        <label>Giá tiền:</label>
                        <label>Mô tả:</label>
                        <label>Phân loại:</label>
                        {product && <label>Trạng thái</label>}
                        {product && <label>Sản phẩm Hot</label>}
                        {product && <label>Sản phẩm mới</label>}
                        <label>Hình ảnh:</label>
                        {
                            product && <label>Hình ảnh ban đầu:</label>
                        }
                    </div>
                    <div className='flex flex-col text-xl space-y-1'>
                        <input className='rounded-md outline-none' {...register("name", validateName)}></input>
                        {errors.name ? <span className='text-red-600'>{errors.name.message}</span> : <span className='h-6'></span>}
                        <input className='rounded-md outline-none' {...register("price", validatePrice)} type='number'></input>
                        {errors.price ? <span className='text-red-600'>{errors.price.message}</span> : <span className='h-6'></span>}
                        <input className='rounded-md outline-none' {...register("description", validateDes)}></input>
                        {errors.description ? <span className='text-red-600'>{errors.description.message}</span> : <span className='h-6'></span>}
                        <select className='rounded-md outline-none' {...register("categoryId", validateCategory)}>
                            {renderOption()}
                        </select>
                        {errors.categoryId ? <span className='text-red-600'>{errors.categoryId.message}</span> : <span className='h-6'></span>}
                        {product && <select className='rounded-md outline-none' {...register("isActive")}>
                            <option value={"true"}>hoạt động </option>
                            <option value={"false"}>không hoạt động</option>
                        </select>}
                        {
                            product && <span className='h-6'></span>
                        }
                        {
                            product &&
                            <select className='rounded-md outline-none' {...register("isHot")} >
                                <option value={"true"}>Có</option>
                                <option value={"false"}>Không</option>
                            </select>
                        }
                        {
                            product && <span className='h-6'></span>
                        }
                        {
                            product &&
                            <select className='rounded-md outline-none' {...register("isNew")}>
                                <option value={"true"}>Có</option>
                                <option value={"false"}>Không</option>
                            </select>
                        }
                        {
                            product && <span className='h-6'></span>
                        }
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload hình ảnh</Button>
                            <br />
                            {errors.img && <span className='text-red-600'>{errors.img.message}</span>}
                        </Upload>
                        {
                            product && <img src={product?.img} className='w-32' />
                        }
                        {
                            product && <input className='hidden' {...register("id")}></input>
                        }
                        <input className='hidden' {...register("img", validateImg)}></input>
                        <button className='bg-blue-600 p-2 text-white'>{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"} </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormProduct
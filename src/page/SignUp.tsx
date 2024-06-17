import React, { useState } from "react"
import WelcomeIMG from '~/resources/Welcome.jpg'
import LOGOCustomize from '~/resources/LOGOCustomize.png'
import { FormDataSignUp } from "~/config/Types"
import UserService from "~/service/UserService"
import { message } from "antd"
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons"
import { RegisterOptions, useForm } from "react-hook-form"
interface formSignUp {
    username: string,
    password: string
    dob: string,
    email: string,
    phone: string
}
function SignUp() {
    const [signUpSuccess, SetSignUpSuccess] = useState(false)
    const validateUsername: RegisterOptions<formSignUp, "username"> = {
        required: "Vui lòng nhập tên đăng nhập",
        minLength: {
            value: 4,
            message: "Tên đăng nhập phải có 4 ký tự"
        }
    }
    const validatePassword: RegisterOptions<formSignUp, "password"> = {
        required: "Vui lòng nhập mật khẩu",
        minLength: {
            value: 8,
            message: "mật khẩu phải có 8 ký tự"
        }
    }
    const validateEmail: RegisterOptions<formSignUp, "email"> = {
        required: "Vui lòng nhập Email",
        pattern: {
            value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
            message: "Email không hợp lệ"
        }
    }
    const validatePhone: RegisterOptions<formSignUp, "phone"> = {
        required: "Vui lòng nhập Số điện thoại",
        validate: (value) => {
            if (value.length === 10) {
                return true
            }
            return "Số điện thoại phải có 10 số"
        }
    }
    const validateDob: RegisterOptions<formSignUp, "dob"> = {
        required: "Vui lòng chọn ngày sinh",
        validate: (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            if (
                age > 18 ||
                (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
            ) {
                return true;
            }
            return 'Tuổi phải lớn hơn hoặc bằng 18';
        }
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<formSignUp>()
    const onSubmit = async (form: formSignUp) => {
        UserService.signUp(form).then((res) => {
            SetSignUpSuccess(true)
        }).catch(() => {
            reset()
            message.error("Trùng Email hoặc tên đăng nhập")
        })
    }
    const formSignUp = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <img src={LOGOCustomize} />
                <label className="w-fit">Tên đăng nhập</label>
                <input {...register("username", validateUsername)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="username" ></input>
                {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
                <label className="w-fit">Mật khẩu</label>
                <input {...register("password", validatePassword)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="password" ></input>
                {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                <label className="w-fit">Email</label>
                <input {...register("email", validateEmail)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="email" ></input>
                {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                <label className="w-fit">Số điện thoại</label>
                <input {...register("phone", validatePhone)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="phone" ></input>
                {errors.phone && <div className='text-red-500'>{errors.phone.message}</div>}
                <label className="w-fit">Ngày sinh</label>
                <input {...register("dob", validateDob)} className="border rounded-lg focus:outline-none h-9 p-2" type="date" name="dob"></input>
                {errors.dob && <div className='text-red-500'>{errors.dob.message}</div>}
                <button className="border mt-4 w-full h-12 rounded-md text-white bg-black hover:bg-blue-600
             transition-colors duration-500 ease-in-out" type="submit">
                    Đăng Ký
                </button>
            </form>
        )
    }
    const waitScreen = () => {
        return (
            <div className="flex justify-center items-center flex-col">
                <CheckCircleFilled style={{ fontSize: "350%", color: "green" }} />
                <span className="mt-8">Chúng tôi đã gửi Email tới gmail của bạn xác thực ngay</span>
            </div>
        )
    }
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-9/12 m-auto">
                        {!signUpSuccess ? formSignUp() : waitScreen()}
                    </div>
                    <div>
                        <img src={WelcomeIMG} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
import React, { useState } from "react"
import WelcomeIMG from '~/resources/Welcome.jpg'
import LOGOCustomize from '~/resources/LOGOCustomize.png'
import UserService from "~/service/UserService"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "~/redux/store"
import { useDispatch } from "react-redux"
import { login } from "~/reducer/authReducer"
import { RegisterOptions, useForm } from "react-hook-form"
import LOGO_GOOGLE from '~/resources/LOGO_GOOGLE.png'
import { OAuthConfigGoogle } from "~/config/OAuthConfig"
import Util from "~/util/Util"
interface formLogin {
    username: string,
    password: string
}
export default function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm<formLogin>()
    const onSubmit = (data: formLogin) => {
        UserService.login(data.username, data.password).then((res) => {
            dispatch(login({ id: res.data.result.id, isAuthenticated: true, username: data.username }))
            localStorage.setItem("token", res.data.result.token)
            navigate("/")
        }).catch((err) => {
            setError("root", {
                message: Util.SetErrorField(err)
            })
        })
    }
    const validateUsername: RegisterOptions<formLogin, "username"> = {
        minLength: {
            value: 4,
            message: "Tên đăng nhập có ít nhất 4 ký tự"
        },
        required: "Vui lòng nhập tên đăng nhập"
    }
    const validatePassword: RegisterOptions<formLogin, "password"> = {
        minLength: {
            value: 8,
            message: "mật khẩu có ít nhất 8 ký tự"
        },
        required: "Vui lòng nhập Mật khẩu"
    }
    const LoginWithGoogle = () => {
        const callbackUrl = OAuthConfigGoogle.redirectUri
        const authUrl = OAuthConfigGoogle.authUri
        const googleClientId = OAuthConfigGoogle.clientId
        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
        window.location.href = targetUrl
    }
    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-9/12">
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-8/12 m-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <img src={LOGOCustomize} />
                            <label className="w-fit">Tài khoản</label>
                            <input {...register("username", validateUsername)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="username"></input>
                            {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
                            <label className="w-fit">Mật khẩu</label>
                            <input {...register("password", validatePassword)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="password"></input>
                            {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                            {errors.root && <div className="text-red-500">{errors.root.message}</div>}
                            <span className="px-1">Chưa có tài khoản ? <a className="text-blue-600" href="/signUp">Đăng Ký Ngay</a></span>
                            <button className="border mt-4 w-full h-12 rounded-md text-white bg-black hover:bg-blue-600
                            duration-200" type="submit">
                                Đăng nhập
                            </button>
                            <div className="rounded-xl bg-gray-400 w-full h-1 my-6"></div>
                            <div className="flex justify-center flex-col ">
                                <div onClick={() => LoginWithGoogle()} className="flex items-center p-2 border rounded-2xl hover:bg-red-300 hover:text-white duration-200">
                                    <img className="w-12" src={LOGO_GOOGLE} />
                                    <span className="px-4">Đăng nhập với Google</span>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div>
                        <img src={WelcomeIMG} />
                    </div>
                </div>
            </div>
        </div>
    )
}

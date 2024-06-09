import React, { useState } from "react"
import WelcomeIMG from '~/resources/Welcome.jpg'
import LOGOCustomize from '~/resources/LOGOCustomize.png'
import { FormDataLogin } from "~/config/Types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons"
import UserService from "~/service/UserService"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "~/redux/store"
import { useDispatch } from "react-redux"
import { login } from "~/reducer/authReducer"
import { RegisterOptions, useForm } from "react-hook-form"
interface formLogin {
    username: string,
    password: string
}
export default function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<formLogin>()
    const onSubmit = (data: formLogin) => {
        UserService.login(data.username, data.password).then((res) => {
            dispatch(login({ id: res.data.result.id, isAuthenticated: true, username: data.username }))
            localStorage.setItem("token", res.data.result.token)
            navigate("/")
        }).catch((err) => {
            message.error("Sai tài khoản hoặc mật khẩu")
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
        maxLength: {
            value: 8,
            message: "mật khẩu có ít nhất 8 ký tự"
        },
        required: "Vui lòng nhập Mật khẩu"
    }
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-8/12 m-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <img src={LOGOCustomize} />
                            <label className="w-fit">Username</label>
                            <input {...register("username", validateUsername)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="username"></input>
                            {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
                            <label className="w-fit">Password</label>
                            <input {...register("password", validatePassword)} className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="password"></input>
                            {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                            <span className="px-1">Chưa có tài khoản ? <a className="text-blue-600" href="/signUp">Đăng Ký Ngay</a></span>
                            <button className="border mt-4 w-full h-12 rounded-md text-white bg-black hover:bg-blue-600
                            duration-200" type="submit">
                                Đăng nhập
                            </button>
                            <div className="rounded-xl bg-gray-400 w-full h-1 my-6"></div>
                            <div className="flex justify-center flex-col ">
                                <div className="flex items-center p-2 border rounded-2xl hover:bg-red-300 hover:text-white duration-200">
                                    <FontAwesomeIcon icon={faFacebook} fontSize={"250%"} color="blue" />
                                    <span className="px-4">Đăng nhập với FaceBook</span>
                                </div>
                                <div className="flex items-center p-2 border rounded-2xl mt-2 hover:bg-red-300 hover:text-white duration-200">
                                    <FontAwesomeIcon icon={faGithub} fontSize={"250%"} color="black" />
                                    <span className="px-4">Đăng nhập với Github</span>
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

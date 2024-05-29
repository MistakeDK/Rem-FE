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
export default function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, SetFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        SetFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.username === "" || formData.password === "") {
            message.error("Tài khoản hoặc mật khẩu không được để trống")
            return;
        }
        UserService.login(formData.username, formData.password).then((res) => {
            dispatch(login({ username: formData.username, isAuthenticated: true }))
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('refreshToken', res.data.result.refreshToken)
            navigate('/')
        }).catch(() => {
            message.error("Sai tài khoản hoặc mật khẩu")
        })
    }
    const handleLoginGithub = () => {
        window.location.href = "http://localhost:8080/rem/oauth2/authorization/github"
    }
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <div className="grid grid-cols-2 gap-1">
                    <div className="w-8/12 m-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <img src={LOGOCustomize} />
                            <label className="w-fit">Username</label>
                            <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="username" onChange={handleChange}></input>
                            <label className="w-fit">Password</label>
                            <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="password" onChange={handleChange}></input>
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
                                <div onClick={handleLoginGithub} className="flex items-center p-2 border rounded-2xl mt-2 hover:bg-red-300 hover:text-white duration-200">
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

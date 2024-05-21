import React, { useState } from "react"
import WelcomeIMG from '~/resources/Welcome.jpg'
import LOGOCustomize from '~/resources/LOGOCustomize.png'
import { FormDataSignUp } from "~/config/Types"
import UserService from "~/service/UserService"
import { message } from "antd"
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons"
function SignUp() {
    const [isWait, SetIsWait] = useState<boolean>(false)
    const [formData, SetFormData] = useState<FormDataSignUp>({
        username: "",
        password: "",
        dob: "",
        email: "",
        phone: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        SetFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        UserService.signUp(formData).then((res) => {
            message.info("Đăng Ký thành công vui lòng xác nhận ở mail của bạn")
            SetIsWait(!isWait)
        }).catch((err) => {
            message.error("Đăng ký thất bại")
        })
    }
    const formSignUp = () => {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col">
                <img src={LOGOCustomize} />
                <label className="w-fit">Username</label>
                <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="username" onChange={handleChange}></input>
                <label className="w-fit">Password</label>
                <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="password" onChange={handleChange}></input>
                <label className="w-fit">email</label>
                <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="email" onChange={handleChange}></input>
                <label className="w-fit">phone</label>
                <input className="border rounded-lg focus:outline-none h-9 p-2" type="text" name="phone" onChange={handleChange}></input>
                <label className="w-fit">Date of birth</label>
                <input className="border rounded-lg focus:outline-none h-9 p-2" type="date" name="dob" onChange={handleChange}></input>
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
                        {!isWait ? formSignUp() : (waitScreen())}
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
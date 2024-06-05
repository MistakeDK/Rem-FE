
export type FormDataLogin = {
    username: string,
    password: string
}
export type FormDataSignUp = {
    username: string,
    password: string,
    email: string,
    phone: string,
    dob: string
}
export type ProductProps = {
    id: string,
    name: string,
    img: string,
    price: number
}
export type typeProduct = {
    id: string,
    name: string,
    price: number,
    img: string,
    description: string,
    isActive: boolean
}
export type typeCategory = {
    id: string,
    name: string
}
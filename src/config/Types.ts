
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
export interface typeProduct {
    id: string,
    name: string,
    price: number,
    img: string,
    description: string,
    isActive: boolean,
    totalReview: number,
    rateStar: number | null
}
export type typeCategory = {
    id: string,
    name: string
}
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export enum PromotionType {
    PERCENT = "PERCENT",
    DIRECT = "DIRECT",
    ALL = "ALL"
}
export enum paymentType {
    VNPAY = "VNPAY",
    CASH = "CASH"
}
export enum Status {
    RECEIVED = "RECEIVED",
    IN_DELIVERY = "IN_DELIVERY",
    DELIVERED = "DELIVERED"
}
export interface formCheckOut {
    name: string,
    phone: string,
    address: string,
    paymentType: paymentType
}
export interface Order {
    id: string
    name: string
    phone: string
    address: string
    valueVoucher: number | null
    promotionType: PromotionType
    time_Create: string
    isPaid: boolean
    paymentType: paymentType
    status: Status
    orderDetails: Array<OrderDetail>
    total: number
}
export interface OrderDetail {
    productId: string
    productName: string
    price: number
    quantity: number
    img: string
    isReview: boolean
}
export interface reviewCreation {
    productId: string,
    rateStar: number,
    review: string,
    orderId: string
}
export interface review {
    username: string
    rateStar: number
    review: string
    timeCreate: string
}
export interface ChangePasswordForm {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export interface formProduct {
    id: string,
    name: string,
    price: number,
    description: string,
    categoryId: string,
    isActive: boolean | true,
    img: string,
    isHot: boolean,
    isNew: boolean
}
export interface category {
    id: string,
    name: string
}
export interface promotion {
    promotionCode: string,
    value: number,
    type: PromotionType,
    active?: boolean
}
export interface user {
    username: string,
    email: string,
    phone: string,
    dob: string,
    role: 'USER' | 'ADMIN',
    userProvide: 'LOCAL' | 'GOOGLE',
    isBan: boolean
}
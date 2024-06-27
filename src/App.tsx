import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '~/page/Login'
import Header from '~/component/Header'
import Home from '~/page/Home'
import SignUp from '~/page/SignUp'
import VerifyAccount from '~/page/VerifyAccount'
import ProductDetail from '~/page/ProductDetail'
import ProductList from '~/page/ProductList'
import PrivateRoute from '~/util/PrivateRoute'
import Profile from '~/page/Profile'
import InfoUser from '~/component/InfoUser'
import AuthorizationOAuth2 from '~/page/AuthorizationOAuth2'
import Cart from '~/page/Cart'
import StatusPayment from '~/page/StatusPayment'
import HistoryOrder from '~/page/HistoryOrder'
import ErrorCode500 from '~/page/ErrorCode500'
import ErrorCode401 from '~/page/ErrorCode401'
import Introduce from '~/page/Introduce'
import ErrorCode404 from '~/page/ErrorCode404'
import ChangePassword from '~/page/ChangePassword'
import Footer from '~/component/Footer'
import HomeAdmin from '~/page/Admin/HomeAdmin'
import ListProduct from '~/page/Admin/ListProduct'
import EditProduct from '~/page/Admin/EditProduct'
import CreateProduct from '~/page/Admin/CreateProduct'
import ScrollToTop from './util/ScrollToTop'


function App() {
  return (
    <BrowserRouter>

      <Header></Header>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/introduce' element={<Introduce />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/verify' element={<VerifyAccount />}></Route>
        <Route path='/Authorization' element={<AuthorizationOAuth2 />}></Route>
        <Route path='/product' element={<ProductList />}></Route>
        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}>
            <Route path='InfoUser' element={<InfoUser />}></Route>
            <Route path='HistoryOrder' element={<HistoryOrder />}></Route>
            <Route path='ChangePassword' element={<ChangePassword />}></Route>
            <Route path='' element={<Navigate to={"/profile/InfoUser"} />}></Route>
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Route>
        <Route path='/payment' element={<StatusPayment />}></Route>
        <Route path='/error500' element={<ErrorCode500 />}></Route>
        <Route path='/error401' element={<ErrorCode401 />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/admin' element={<HomeAdmin />}>
            <Route path='product'>
              <Route path='ListProduct' element={<ListProduct />}></Route>
              <Route path='CreateProduct' element={<CreateProduct />}></Route>
              <Route path='ListProduct/:id' element={<EditProduct />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<ErrorCode404 />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App

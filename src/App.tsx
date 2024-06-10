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

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/verify' element={<VerifyAccount />}></Route>
        <Route path='/Authorization' element={<AuthorizationOAuth2 />}></Route>
        <Route path='/product' element={<ProductList />}></Route>
        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}>
            <Route path='InfoUser' element={<InfoUser />}></Route>
            <Route path='' element={<Navigate to={"/profile/InfoUser"} />}></Route>
          </Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Route>
        <Route path='/payment' element={<StatusPayment />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

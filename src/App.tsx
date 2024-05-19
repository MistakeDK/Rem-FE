import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '~/page/Login'
import Header from '~/component/Header'
import Home from '~/page/Home'
import SignUp from '~/page/SignUp'
import VerifyAccount from '~/page/VerifyAccount'


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify' element={<VerifyAccount />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

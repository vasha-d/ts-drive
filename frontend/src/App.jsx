import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import CreateAccount from './components/auth/CreateAccount'
import Drive from './components/drive/Drive'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/drive" replace/>}></Route>
          <Route path='/drive/*' element={<Drive></Drive>}></Route>
          <Route path='/auth'>
              <Route index element={<Navigate to={'sign-in'}></Navigate>}></Route>
              <Route path='sign-in' 
                element={<SignIn></SignIn>}>
              </Route>
              <Route path='create-account' 
                element={<CreateAccount></CreateAccount>}>
              </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App

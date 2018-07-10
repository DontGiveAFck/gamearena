import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import SignupPage from './components/pages/SignupPage'
import UserRoute from './components/routes/UserRoute'
import GuestRoute from './components/routes/GuestRoute'

const App = ({ location }) => {
    return (
        <div className='ui container'>
            <Route location={location} path='/' exact component={HomePage}/>
            <GuestRoute location={location} path='/login' exact component={LoginPage}/>
            <GuestRoute location={location} path='/signup' exact component={SignupPage}/>
            <UserRoute location={location} path='/profile' exact component={ProfilePage}/>
        </div>
    )
}

export default App

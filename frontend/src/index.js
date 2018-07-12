/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './rootReducer'
import { userLoggedIn } from './action-creators/auth-action-creators'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

let token
if (token = cookies.get('token')) {
    const user = {
        token: token
    }
    store.dispatch(userLoggedIn(user))
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'))
registerServiceWorker()

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import axios from 'axios'
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueLogin: '',
            valuePassword: ''
        };

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    }
    render() {
        return (
            <form className='form'>
                <h1>Login Page</h1>
                <Input value={this.state.valueLogin} onChange={(evt) => this.updateLoginValue(evt)}/> <br/>
                <Input value={this.state.valuePassword} type='password' onChange={(evt) => this.updatePasswordValue(evt)}/> <br/>
                <div className='buttons'>
                    <Button variant="contained" color="primary" onClick={this.handleLoginButtonClick}>
                        Sign in
                    </Button>
                    <Button variant="contained" color="primary">
                        Sign up
                    </Button>
                </div>
            </form>
        );
    }

    async handleLoginButtonClick() {
        let response;
        try {
            const url = 'http://localhost:3001/users';
            const data = {
                login: this.state.valueLogin,
                password: this.state.valuePassword
            };
            response = await axios.post(url, data);
            console.log(response);
            console.log(document.cookie)
        } catch (err) {
            console.log(err);
        }

    }

    updatePasswordValue(evt) {
        this.setState({
            valuePassword: evt.target.value
        });
        console.log(this.state);
    }

    updateLoginValue(evt) {
        this.setState({
            valueLogin: evt.target.value
        });
        console.log(this.state);
    }
}

class RegistrForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueLogin: '',
            valuePassword: '',
            valueEmail: '',
            valueUsername: ''
        };

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleRegistrButtonClick = this.handleRegistrButtonClick.bind(this);
    }

    updatePasswordValue(evt) {
        this.setState({
            valuePassword: evt.target.value
        });
    }

    updateLoginValue(evt) {
        this.setState({
            valueLogin: evt.target.value
        });
    }

    updateEmailValue(evt) {
        this.setState({
            valueEmail: evt.target.value
        });
    }

    updateUsernameValue(evt) {
        this.setState({
            valueUsername: evt.target.value
        });
    }

    handleLoginButtonClick() {

    }

    async handleRegistrButtonClick() {
        let response;
        try {
            const url = 'http://localhost:3001/users';
            const data = {
                login: this.state.valueLogin,
                password: this.state.valuePassword,
                email: this.state.valueEmail,
                username: this.state.valueUsername
            };
            response = await axios.put(url, data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <form action="">
                <h1>Registration Page</h1>
                <Input value={this.state.valueLogin} onChange={(evt) => this.updateLoginValue(evt)}/> <br/>
                <Input value={this.state.valuePassword} type='password' onChange={(evt) => this.updatePasswordValue(evt)}/> <br/>
                <Input value={this.state.valueEmail} type='email' onChange={(evt) => this.updateEmailValue(evt)}/> <br/>
                <Input value={this.state.valueUsername} onChange={(evt) => this.updateUsernameValue(evt)}/> <br/>
                <Button variant="contained" color="primary" onClick={this.handleLoginButtonClick}>
                    Sign in
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleRegistrButtonClick}>
                    Sign up
                </Button>
            </form>
        );
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        };
    }
    render() {

        if(this.state.isLogged == false) {

        }

        return (
            <div id='page'>

            </div>
        );
    }
}

ReactDOM.render(<LoginForm/>, document.getElementById('root'));
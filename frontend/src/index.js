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

class Profile extends React.Component {
    constructor(props) {
        super(props)
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
        return (
            <div id='page'>

            </div>
        );
    }
}

ReactDOM.render(<LoginForm/>, document.getElementById('root'));




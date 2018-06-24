import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeLogin: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'login', value }),
    onChangeEmail: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
      dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onSubmit: (login, username, email, password) => {
      const payload = agent.Auth.register(login, username, email, password);
      dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
      dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
    constructor() {
        super();
        this.changeLogin = ev => this.props.onChangeLogin(ev.target.value);
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.submitForm = (login, username, email, password) => ev => {
          ev.preventDefault();
          this.props.onSubmit(login, username, email, password);
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const login = this.props.login;
        const email = this.props.email;
        const password = this.props.password;
        const username = this.props.username;

        return (
          <div className="auth-page">
                  <h2 className="auth-label">Sign Up</h2>
                  <ListErrors errors={this.props.errors} />

                  <form onSubmit={this.submitForm(login, username, email, password)} className='login-form'>
                        <TextField
                            label="Name"
                            value={login}
                            onChange={this.changeLogin}
                        />
                        <br/>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={this.changeUsername}
                        />
                        <br/>
                        <TextField
                            type='email'
                            label="Email"
                            value={email}
                            onChange={this.changeEmail}
                        />
                        <br/>
                        <TextField
                            type='password'
                            label="Password"
                            value={password}
                            onChange={this.changePassword}
                        />
                         <br/>
                      <Button variant="contained" color="primary"
                              className='btn'
                              type="submit"
                              disabled={this.props.inProgress}>
                          Sign up
                      </Button>
                  </form>
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

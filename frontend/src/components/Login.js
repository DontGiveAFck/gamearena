import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeLogin: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'login', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (login, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(login, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeLogin = ev => this.props.onChangeLogin(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (login, password) => ev => {
      console.log("PREVENTED");
      ev.preventDefault();
      this.props.onSubmit(login, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const login = this.props.login;
    const password = this.props.password;
    return (
      <div className="auth-page">
              <h2 className='auth-label'>Sign in</h2>
              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(login, password)} className='login-form'>
                    <TextField
                        label="Name"
                        value={login}
                        onChange={this.changeLogin}
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
                            type="submit"
                            disabled={this.props.inProgress}>
                      Sign in
                    </Button>
              </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

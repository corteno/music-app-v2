import React, {Component} from 'react';
import FormInput from './formInput';
import {connect} from 'react-redux';

import AuthService from '../utils/AuthService';
import {registerUser, switchLoginForm} from "../actions";
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: true,
            user: {
                username: '',
                password: '',
                email: ''
            },
            message: ''

        };
    }

    resetForm = () => {
        this.setState({
            user: {
                username: '',
                password: '',
                email: ''
            }
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        AuthService.login({username: this.state.user.username, password: this.state.user.password})
            .then(() => {
                console.log('yep');
            })
            .catch(() => {
                this.setState({message: 'Invalid credentials'});
            })

    };

    onInputChange = (e) => {
        let currentUserState = this.state.user;

        switch (e.target.name) {
            case 'username':
                currentUserState.username = e.target.value;
                break;

            case 'password':
                currentUserState.password = e.target.value;
                break;

            case 'email':
                currentUserState.email = e.target.value;
                break;

            default:
                break;

        }

        this.setState({user: currentUserState});
    };

    onRegisterClick = () => {
        this.props.switchLoginForm(this.props.login.isLogin);
        this.resetForm();
        /*this.setState({isLogin: !this.state.isLogin}, () => {
            this.resetForm();
        });*/

    };

    onRegister = (e) => {
        e.preventDefault();
        this.props.registerUser({
            username: this.state.user.username,
            password: this.state.user.password,
            email: this.state.user.email
        });
        //this.resetForm();
    };

    render() {
        return (
            <div className="login-wrapper">
                <form className="login-form col"
                      onSubmit={this.props.login.isLogin ? this.onSubmit : (e) => this.onRegister(e)}>
                    <h1 className='form-title'>{this.props.login.isLogin ? 'Login' : 'Register'}</h1>

                    {this.props.login.isLogin ? ''
                        : <FormInput
                            type="email"
                            name="email"
                            className="login-email"
                            onInputChange={this.onInputChange}
                            value={this.state.user.email}
                            placeholder='E-mail'
                            required={true}
                        />
                    }

                    <FormInput
                        type="text"
                        name="username"
                        className="login-username"
                        onInputChange={this.onInputChange}
                        value={this.state.user.username}
                        placeholder='Username'
                        required={true}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        className="login-password"
                        onInputChange={this.onInputChange}
                        value={this.state.user.password}
                        placeholder='Password'
                        required={true}
                    />
                    <p className="form-message">
                        {this.props.login.message}
                    </p>

                    <input
                        type="submit"
                        value={this.props.login.isLogin ? 'Login' : 'Register'}
                        className="form-submit"
                    />

                    <p
                        className="login-register"
                        onClick={this.onRegisterClick}>
                        {this.props.login.isLogin ? 'Click here to register' : 'Click here to login'}
                    </p>

                </form>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps, {registerUser, switchLoginForm})(Login);
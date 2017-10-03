import React, {Component} from 'react';
import FormInput from './formInput';

import AuthService from '../utils/AuthService';
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
            }

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

        AuthService.login({
            username: this.state.user.username,
            password: this.state.user.password
        });

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

        }

        this.setState({user: currentUserState});
    };

    onRegisterClick = () => {
        this.setState({isLogin: !this.state.isLogin}, () => {
            this.resetForm();
        });

    };

    render() {

        return (
            <div className="login-wrapper">
                <form className="login-form col" onSubmit={this.onSubmit}>
                    <h1 className='form-title'>{this.state.isLogin ? 'Login' : 'Register'}</h1>

                    {this.state.isLogin ? ''
                        : <FormInput
                            type="email"
                            name="email"
                            className="login-email"
                            onInputChange={this.onInputChange}
                            value={this.state.user.email}
                            placeholder='E-mail'
                        />
                    }

                    <FormInput
                        type="text"
                        name="username"
                        className="login-username"
                        onInputChange={this.onInputChange}
                        value={this.state.user.username}
                        placeholder='Username'
                    />

                    <FormInput
                        type="password"
                        name="password"
                        className="login-password"
                        onInputChange={this.onInputChange}
                        value={this.state.user.password}
                        placeholder='Password'
                    />

                    <input
                        type="submit"
                        value={this.state.isLogin ? 'Login' : 'Register'}
                        className="form-submit"
                    />

                    <p
                        className="login-register"
                        onClick={this.onRegisterClick}>
                        {this.state.isLogin ? 'Click here to register' : 'Click here to login'}
                    </p>

                </form>
            </div>

        );
    }
}

export default Login;
import React, {Component} from 'react';
import FormInput from './formInput';
import AuthService from '../utils/AuthService';
import {connect} from 'react-redux';

import './modal.css';
import {createRoom} from "../actions/";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomname: '',
            password: '',
            isPrivate: false
        };
    }

    onInputChange = (e) => {

        switch (e.target.name) {
            case 'roomname':
                this.setState({roomname: e.target.value});
                break;

            case 'password':
                this.setState({password: e.target.value});
                break;

            case 'private':
                this.setState({isPrivate: !this.state.isPrivate});
                this.setState({password: ''});
                break;

            default:
                break;

        }


    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createRoom({
            name: this.state.roomname,
            password: this.state.password,
            owner: AuthService.getUserDetails().username,
            isPublic: !this.state.isPrivate
        });
        this.props.close();
    };

    render() {
        return (
            <div className={'modal-wrapper ' + this.props.className}>
                <div className="modal-close" onClick={this.props.close}/>
                <form className="modal-form col" onSubmit={this.onSubmit}>
                    <FormInput
                        type="text"
                        name="roomname"
                        className="modal-roomname"
                        onInputChange={this.onInputChange}
                        value={this.state.roomname}
                        placeholder='Room name'
                        required={true}
                    />
                    {this.state.isPrivate
                        ? <FormInput
                            type='password'
                            name='password'
                            className='modal-password'
                            onInputChange={this.onInputChange}
                            value={this.state.password}
                            placeholder='Password'
                            required={true}
                        />
                        : ''
                    }

                    <FormInput
                        type="checkbox"
                        name='private'
                        className='modal-public'
                        onInputChange={this.onInputChange}
                        value={this.state.isPrivate}
                        labelName='Private'
                        required={false}
                    />

                    <FormInput
                        type="submit"
                        name='submit'
                        className='modal-submit'
                        value='Create'
                    />


                </form>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return ({
        createRoom: (room) => {dispatch(createRoom(room))}
    });
};

let mapStateToProps = (state) => {
    return {state};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
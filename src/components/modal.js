import React, {Component} from 'react';
import FormInput from './formInput';

import './modal.css';

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

    render() {
        return (
            <div className='modal-wrapper'>
                <form action="" className="modal-form col">
                    <FormInput
                        type="text"
                        name="roomname"
                        className="modal-roomname"
                        onInputChange={this.onInputChange}
                        value={this.state.roomname}
                        placeholder='Room name'
                    />
                    {this.state.isPrivate
                        ?<FormInput
                            type='password'
                            name='password'
                            className='modal-password'
                            onInputChange={this.onInputChange}
                            value={this.state.password}
                            placeholder='Password'
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
                    />

                    <FormInput
                        type="submit"
                        name='submit'
                        className='modal-submit'
                        onInputChange={this.onSubmit}
                        value='Create'
                    />


                </form>
            </div>
        );
    }
}

export default Modal;
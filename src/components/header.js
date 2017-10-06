import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import Modal from './modal';
import './header.css';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            isMenuOpen: false,
            isCreatingRoom: false,
            isClosing: false
        }
    }
    
    componentDidMount(){

    }

    toggleMenu = () => {
        console.log('toggle');
        if(this.state.isMenuOpen){
            this.setState({isMenuOpen: false})
        } else {
            this.setState({isMenuOpen: true})
        }
    };

    createRoom = () => {
        this.setState({isCreatingRoom: true});
    };

    closeModal = () => {
      this.setState({isClosing: true}, () => {
          setTimeout(() => {
              this.setState({isCreatingRoom: false, isClosing: false});
          }, 300)
      });
    };
    
    render() {
        return (
            <header className='header-wrapper'>
                <div className="hamburger" onClick={this.toggleMenu}>&#9776;</div>
                {this.props.location.pathname === "/"
                    ? <div className="create-room" onClick={this.createRoom}>+</div>
                    : ''
                }
                {this.state.isCreatingRoom
                    ? <Modal
                        className={this.state.isClosing ? 'modal-closing' : ''}
                        close={this.closeModal}
                      />
                    : ''
                }
            </header>
        );
    }
}

export default withRouter(Header);
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AuthService from '../utils/AuthService';
import Classname from '../utils/Classname';

import Modal from './modal';
import Menu from './menu';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            isCreatingRoom: false,
            isClosing: false,
            isMenuClosing: false,
            menuClassNames: ''
        }
    }

    componentDidMount() {
    }

    toggleMenu = () => {
        if (this.state.isMenuOpen) {
            this.setState({isMenuOpen: false, menuClassNames: ''})
        } else {
            this.setState({isMenuOpen: true, menuClassNames: 'menu-open'})
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

    closeMenu = () => {
        console.log(this.state.isMenuClosing);
        this.setState({isMenuClosing: true}, () => {
            setTimeout(() => {
                this.setState({isMenuClosing: false, isMenuOpen: false});
            }, 280)
        });
    };

    render() {
        return (
            <header className='header-wrapper'>
                <div className="hamburger" onClick={this.toggleMenu}>&#9776;</div>
                {this.props.location.pathname === "/" //If it's the root path (rooms)
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

                {/*{this.state.isMenuOpen
                    ? <Menu
                        toggleMenu={this.toggleMenu}
                        closeMenu={this.closeMenu}
                        className={this.state.isMenuClosing ? 'menu-closing' : ''}
                    >

                        {this.props.location.pathname === "/" //If it's the root path aka rooms
                            ? <div className="menu-header col">
                                <h2 className="menu-room-name">{AuthService.getUserDetails().username}</h2>
                            </div>
                            : <div className="menu-header col">
                                <h2 className="menu-room-name">{this.props.room.name}</h2>
                                <h3 className="menu-room-owner">{this.props.room.owner}</h3>
                            </div>
                        }


                        <ul className="menu-list col">
                            <li className="menu-list-item">
                                <Link
                                    to="/"
                                    className="menu-list-item-link"
                                >Rooms</Link>
                            </li>
                            <li className="menu-list-item">
                                <Link
                                    to=""
                                    className="menu-list-item-link"
                                    onClick={() => AuthService.logout()}
                                >Logout</Link>
                            </li>
                        </ul>
                    </Menu>
                    : ''
                }*/}

                <Menu
                    toggleMenu={this.toggleMenu}
                    closeMenu={this.closeMenu}
                    className={Classname({
                        'menu-open': this.state.isMenuOpen,
                        'menu-closing': this.state.isMenuClosing
                    })}
                >
                    {this.props.location.pathname === "/" //If it's the root path aka rooms
                        ? <div className="menu-header col">
                            <h2 className="menu-room-name">{AuthService.getUserDetails().username}</h2>
                        </div>
                        : <div className="menu-header col">
                            <h2 className="menu-room-name">{this.props.room.name}</h2>
                            <h3 className="menu-room-owner">{this.props.room.owner}</h3>
                        </div>
                    }


                    <ul className="menu-list col">
                        <li className="menu-list-item">
                            <Link
                                to="/"
                                className="menu-list-item-link"
                            >Rooms</Link>
                        </li>
                        <li className="menu-list-item">
                            <Link
                                to=""
                                className="menu-list-item-link"
                                onClick={() => AuthService.logout()}
                            >Logout</Link>
                        </li>
                    </ul>
                </Menu>

                {this.props.children /* To render children written between the <Header></Header> tags*/}
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        room: state.room
    })
};

export default connect(mapStateToProps)(withRouter(Header));
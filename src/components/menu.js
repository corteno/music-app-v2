import React, {Component} from 'react';

import './menu.css';

class Menu extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className={"menu-wrapper " + this.props.className}>
                <div className="menu-content-wrapper col">
                    {this.props.children}
                </div>
                <div className="menu-background" onClick={() => this.props.closeMenu()}> </div>
            </div>
        );
    }
}

export default Menu;
import React, {Component} from 'react';
import Header from './header';
import RoomList from './roomList';


import './rooms.css';

class Rooms extends Component {
    constructor(props){
        super(props);


    }
    
    render() {
        return (
            <div className='rooms-wrapper col'>
                <Header />
                <RoomList />
            </div>
        );
    }
}

export default Rooms;
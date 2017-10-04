import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRooms} from '../actions';
import _ from 'lodash';

import RoomListItem from './roomListItem';

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }
    }
    
    componentWillMount(){
        this.props.getRooms();
    }

    renderRooms = () => {
        return _.map(this.props.rooms, room => {
            return(
                <RoomListItem
                    key={room.id}
                    room={room}
                    onClick={this.onRoomClick}
                />
            );
        });
    };

    render() {
        return (
            <ul className="room-list-wrapper">
                {this.renderRooms()}
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return {rooms: state.rooms}
};

export default connect(mapStateToProps, {getRooms})(RoomList);
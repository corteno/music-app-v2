import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRooms} from '../actions';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';

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

    onRoomClick = (id) => {
        this.props.history.push(`/${id}`);
    };

    renderRooms = () => {
        return _.map(this.props.rooms.rooms, room => {
            return(
                <RoomListItem
                    key={room.id}
                    room={room}
                    onRoomClick={this.onRoomClick}
                />
            );
        });
    };

    render() {
        return (
            <ul className="room-list-wrapper col">
                {this.renderRooms()}
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return {rooms: state.rooms}
};

export default connect(mapStateToProps, {getRooms})(withRouter(RoomList));
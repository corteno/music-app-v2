import React, {Component} from 'react';
import './roomListItem.css';

const RoomListItem = (props) => {

    console.log(props.room);
    return (
        <li className="room-list-item">
            <div className="room-list-item-content col">
                <p className="room-name">{props.room.name}</p>
                <p className="room-owner">{props.room.owner}</p>
            </div>
        </li>
    );
};

export default RoomListItem;
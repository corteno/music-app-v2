import React from 'react';
import './roomListItem.css';

const RoomListItem = (props) => {
    return (
        <li className="room-list-item" onClick={() => props.onRoomClick(props.room.id)}>
            <div className="room-list-item-content col">
                <p className="room-name">{props.room.name}</p>
                <p className="room-owner">{props.room.owner}</p>
            </div>
        </li>
    );
};

export default RoomListItem;
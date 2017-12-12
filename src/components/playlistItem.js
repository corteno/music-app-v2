import React from 'react';

import './playlistItem.css'
import DeleteSvg from '../img/trash-2.svg';

const PlaylistItem = (props) => {

    //make the ontouch functions here and convert this into a component

    return (
        <li className="playlist-item"
            onTouchStart={(e) => console.log('start')}
            onTouchMove={(e) => console.log('move')}
            onTouchEnd={(e) => console.log('end')}
        >
            <div className="playlist-img-wrapper">
                <img src={props.song.thumbnail} alt="" className="search-list-item-img"/>
            </div>
            <div className="playlist-content-wrapper col">
                <p className="playlist-content-name">{props.song.title}</p>
                <p className="playlist-content-duration">{props.song.duration}</p>
            </div>
            <div className="playlist-item-delete" onClick={() => props.deletePlaylistItem(props.song._id)}>
                <img src={DeleteSvg} alt=""/>
            </div>
        </li>
    );
};

export default PlaylistItem;
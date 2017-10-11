import React, {Component} from 'react';

import './playlistItem.css'

const PlaylistItem = (props) => {

    return (
        <li className="playlist-item">
            <div className="playlist-img-wrapper">
                <img src={props.song.thumbnail} alt="" className="search-list-item-img"/>
            </div>
            <div className="playlist-content-wrapper col">
                <p className="playlist-content-name">{props.song.title}</p>
                <p className="playlist-content-duration">{props.song.duration}</p>
            </div>
        </li>
    );
};

export default PlaylistItem;
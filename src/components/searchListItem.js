import React from 'react';

import './searchListItem.css';

const SearchListItem = (props) => {
    return (
        <li className='search-list-item'>
            <div className="search-list-img-wrapper">
                <img src={props.song.thumbnail} alt="" className="search-list-item-img"/>
            </div>
            <div className="search-list-content-wrapper col">
                <p className="search-list-content-name">{props.song.title}</p>
                <p className="search-list-content-duration">{props.song.duration}</p>
            </div>
            <div className="search-list-add" onClick={() => {props.addSong(props.song, props.roomId)}}>+</div>
        </li>
    );
};

export default SearchListItem;
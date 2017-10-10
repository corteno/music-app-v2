import React, {Component} from 'react';

import './searchListItem.css';

const SearchListItem = (props) => {
    return (
        <li className='search-list-item'>
            <div className="search-list-img-wrapper">
                <img src={props.thumbnail} alt="" className="search-list-item-img"/>
            </div>
            <div className="search-list-content-wrapper col">
                <p className="search-list-content-name">{props.title}</p>
                <p className="search-list-content-duration">{props.duration}</p>
            </div>
            <div className="search-list-add">+</div>
        </li>
    );
};

export default SearchListItem;
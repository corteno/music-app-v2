import React, {Component} from 'react';
import _ from 'lodash';

import API_KEY from '../utils/ApiKey';
import SearchIcon from '../img/search.svg';
import './search.css';

import {connect} from 'react-redux';
import {search} from '../actions/';


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchOpen: this.props.isSearchOpen,
            maxResults: 15,
            searchTerm: ''
        };

        this.videoSearch = _.debounce(this.videoSearch, 200);
    }

    toggleSearch = () => {
        this.props.toggleSearch();
        this.searchInput.focus();
    };

    onSearchClick = () => {
        this.props.onSearchClick();
    };

    videoSearch = (term) => {
        this.props.search({
            part: 'snippet',
            key: API_KEY,
            q: term,
            type: 'video',
            maxResults: this.state.maxResults

        });
    };

    onInputChange = (e) => {
        this.setState({searchTerm: e.target.value}, () => {
            this.videoSearch(this.state.searchTerm);
        });
    };

    render() {
        return (
            <div className='search-wrapper'>
                <input
                    type="text"
                    className="search-input"
                    ref={(input) => this.searchInput = input}
                    placeholder='Search for music'
                    onChange={this.onInputChange}
                    value={this.state.searchTerm}
                    onClick={this.onSearchClick}
                />
                <img className='search-icon' src={SearchIcon} alt="" onClick={/*this.props.isSearchOpen ? */this.toggleSearch}/>
            </div>
        );
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return ({
       search: (params) => {dispatch(search(params))}
    });
};*/


export default connect(null, {search})(Search);
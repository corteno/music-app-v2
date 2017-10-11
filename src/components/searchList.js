import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addSong} from "../actions/";


import SearchListItem from './searchListItem';
import './searchList.css';

class SearchList extends Component {

    renderSearchList = () => {
        if(this.props.search.length > 0){
            return this.props.search.map((search) => {
                return (
                    <SearchListItem
                        key={search.id}
                        song={search}
                        roomId={this.props.roomId}
                        addSong={this.props.addSong}
                    />
                );
            });
        }

    };

    render() {
        return (
            <ul className="search-list-wrapper col">
                {this.renderSearchList()}
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        search: state.search,
        roomId: state.room.id
    })
};

export default connect(mapStateToProps, {addSong})(SearchList);
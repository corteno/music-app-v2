import React, {Component} from 'react';
import {connect} from 'react-redux';



import SearchListItem from './searchListItem';
import './searchList.css';

class SearchList extends Component {

    renderSearchList = () => {
        if(this.props.search.length > 0){
            return this.props.search.map((search) => {
                return (
                    <SearchListItem
                        id={search.id}
                        key={search.id}
                        title={search.title}
                        thumbnail={search.thumbnail}
                        duration={search.duration}
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
        search: state.search
    })
};

export default connect(mapStateToProps)(SearchList);
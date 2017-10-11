import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './header';
import MusicControls from './musicControls';
import Playlist from './playlist';
import Search from './search';
import SearchList from './searchList';


import {getRoom} from '../actions/';
import './room.css';


class Room extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSearchOpen: false
        }

    }

    componentDidMount() {
        this.props.getRoom(this.props.match.params.id, '');
    }

    toggleSearch = () => {
        this.setState({isSearchOpen: !this.state.isSearchOpen});
    };

    onSearchClick = () => {
        this.setState({isSearchOpen: true});
    };
    
    render() {
        return (
            <div className='room-wrapper col'>
                <Header>
                    <Search
                        toggleSearch={this.toggleSearch}
                        onSearchClick={this.onSearchClick}
                    />
                </Header>
                {this.state.isSearchOpen
                    ? <SearchList/>
                    : <Playlist/>
                }

                <MusicControls/>
            </div>
        );
    }
}

/*let mapDispatchToProps = (dispatch) => {
  return ({
      getRoom: (id) => {dispatch(getRoom(id))}
  });
};*/

let mapStateToProps = (state) => {
    return ({
        room: state.room
    });
};

export default connect(mapStateToProps, {getRoom})(withRouter(Room));
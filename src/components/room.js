import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './header';
import MusicControls from './musicControls';
import Playlist from './playlist';
import Search from './search';
import SearchList from './searchList';
import YoutubePlayer from './youtubePlayer';


import {getRoom} from '../actions/';
import './room.css';


class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchOpen: false,
            currentTime: '0:00'
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

    setCurrentTime = (time) => {
        this.setState({currentTime: time});
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
                    : ''

                }
                <div className="player-content-wrapper col">
                    <YoutubePlayer/>
                    <Playlist/>
                </div>

                <MusicControls
                    playlist={this.props.room.playlist}
                    currentTime={this.state.currentTime}
                />
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
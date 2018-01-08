import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './header';
import MusicControls from './musicControls';
import Playlist from './playlist';
import Search from './search';
import SearchList from './searchList';
import YoutubePlayer from './youtubePlayer';
import AuthService from '../utils/AuthService';

import {getRoom, getPlaylist, refreshPlaylist} from '../actions';
import './room.css';


class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchOpen: false,
            currentTime: '0:00'
        }

    }

    componentWillMount() {
        //this.setState({socket: this.props.socket})
    }

    componentDidMount() {
        this.props.getRoom(this.props.match.params.id, '');

        this.props.socket.emit('subscribe', {
            roomId: this.props.match.params.id,
            username: AuthService.getUserDetails().username
        });

        this.props.socket.on(`refresh-${this.props.match.params.id}`, (data) => {
            if(data.type === 'refreshPlaylist'){
                this.props.getRoom(this.props.match.params.id, '')
            } else if(data.type === 'refreshPlaylistDelete'){
                this.props.refreshPlaylist(this.props.match.params.id)
            }

        });


    }

    componentWillUnmount() {
        this.disconnectFromSocket();
    }

    disconnectFromSocket = () => {
        this.props.socket.emit('unsubscribe', {
            roomId: this.props.room.id,
            username: AuthService.getUserDetails().username
        })
    };

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
        room: state.room,
        socket: state.socket
    });
};

export default connect(mapStateToProps, {getRoom, getPlaylist, refreshPlaylist})(withRouter(Room));
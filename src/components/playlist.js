import React, {Component} from 'react';
import {connect} from 'react-redux';

import PlaylistItem from './playlistItem';

class Playlist extends Component {

    renderPlaylist = () => {
        console.log('room', this.props.playlist);
    };

    render() {
        return (
            <ul className="playlist-wrapper">
                {this.renderPlaylist()}
            </ul>
        );
    }
}

let mapStateToProps = (state) =>{
    return ({
        playlist: state.room.playlist
    })
};

export default connect(mapStateToProps)(Playlist);
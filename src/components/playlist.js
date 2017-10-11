import React, {Component} from 'react';
import {connect} from 'react-redux';

import PlaylistItem from './playlistItem';

class Playlist extends Component {

    renderPlaylist = () => {
        if (this.props.playlist) {
            return this.props.playlist.map((song) => {
                return (
                    <PlaylistItem
                        key={`${song.id}-pl`}
                        song={song}
                    />
                );
            })
        }
    };

    render() {
        return (
            <ul className="playlist-wrapper col">
                {this.renderPlaylist()}
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        playlist: state.room.playlist
    })
};

export default connect(mapStateToProps)(Playlist);
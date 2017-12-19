import React, {Component} from 'react';
import {connect} from 'react-redux';
import shortid from 'shortid';
import {getPlaylist, deleteSong, getRoom} from "../actions/";
import _ from 'lodash';

import PlaylistItem from './playlistItem'
import "./playlist.css";

class Playlist extends Component {
    constructor(props){
        super(props);

        this.state = {
            minDistance: 100,
            startTouchPos: 0

        }
    }

    componentWillMount(){
        if(!_.isEmpty(this.props.room)){
            this.props.getPlaylist(this.props.room);
        }

    }

    renderPlaylist = () => {
        //Maybe add another if to check if room is not empty then render this shit or make some magic with redux

        if (this.props.playlist) {
            return this.props.room.playlist.map((song) => {
                return (
                    <PlaylistItem
                        key={shortid.generate()}
                        song={song}
                        deletePlaylistItem={this.deletePlaylistItem}
                        testStart={this.onTouchStart}
                        testMove={this.onTouchMove}
                        testEnd={this.onTouchEnd}
                    />
                );
            })
        }
    };

    
    deletePlaylistItem = (id) => {
        this.props.deleteSong(this.props.room.id, id);
    };

    render() {
        // console.log('playlist', this.props.playlist);
        return (
            <ul className="playlist-wrapper col">
                {this.renderPlaylist()}
            </ul>
        );
    }
}

let mapStateToProps = (state) => {
    return ({
        playlist: state.room.playlist,
        room: state.room
    });
};

/*let mapDispatchToProps = (dispatch) => {
    return ({
        deleteSong: (roomid, songid) => { dispatch(deleteSong(roomid, songid)) }
    });
};*/


export default connect(mapStateToProps, {getPlaylist, deleteSong, getRoom})(Playlist);
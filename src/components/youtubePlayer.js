import React, {Component} from 'react';
import {connect} from 'react-redux';
import Youtube from 'react-youtube';
import {setCurrentSong, setPlayer, setCurrentTime, setIsPlaying, deleteSong} from '../actions';

import './youtubePlayer.css';

class YoutubePlayer extends Component {
    constructor(props){
        super(props);

        this.state = {
            opts: {
                playerVars: {
                    //Enable once done testing
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    autohide: 0,
                    rel: 0,
                    iv_load_policy: 3
                }
            }

        }
    }

    //Formating time to 0:00 or 00:00 depending on length
    formatTime = (time) => {
        //console.log(time);
        let minutes = Math.floor(time / 60);
        let seconds = time;


        if (seconds <= 9) {
            return `${minutes}:0${seconds}`
        } else if (seconds > 60) {
            seconds = seconds % 60;

            if (seconds <= 9) {
                return `${minutes}:0${seconds}`
            } else {
                return `${minutes}:${seconds}`
            }

        }
        return `${minutes}:${seconds}`
    };

    onReady = (event) => {
        this.setState({player: event.target});
        this.props.setPlayer(event.target);
        this.props.setCurrentSong(this.props.playlist[0]);
    };

    onPlay = () => {
        this.props.setIsPlaying(true);
        this.props.setCurrentTime(this.formatTime(Math.round(this.props.player.ytplayer.getCurrentTime())));
        this.interval = setInterval(() => {
            this.props.setCurrentTime(this.formatTime(Math.round(this.props.player.ytplayer.getCurrentTime())));
        }, 1000);
    };


    //Pauses on switching tab
    onPause = () => {
        this.props.setIsPlaying(false);
        clearInterval(this.interval);
    };

    onEnd = () => {
        console.log(this.props.roomId);
        this.props.deleteSong(this.props.roomId, this.props.player.currentSong._id);
    };

    getCurrentSongId = () => {
        if(this.props.playlist && this.props.player.currentSong){
            return this.props.player.currentSong.id;
        }
    };

    
    render() {
        return (
            <div className={this.props.player.isVisible ? 'youtube-player-wrapper player-visible' : 'youtube-player-wrapper player-hidden'}>
                <Youtube
                    videoId={this.getCurrentSongId()}
                    opts={this.state.opts}
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnd={this.onEnd}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
  return ({
      playlist: state.room.playlist,
      player: state.player,
      roomId: state.room.id
  });
};

export default connect(mapStateToProps, {setCurrentSong, setPlayer, setCurrentTime, setIsPlaying, deleteSong})(YoutubePlayer);
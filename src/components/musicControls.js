import React, {Component} from 'react';
import {connect} from 'react-redux';

import {togglePlay, togglePlayerWindow, setCurrentTime} from "../actions";

import './musicControls.css';
import Play from '../img/play.svg';
import Pause from '../img/pause.svg';
import Heart from '../img/heart.svg';
import Skip from '../img/skip-forward.svg';
import Minimize from '../img/minimize-2.svg'
import Maximize from '../img/maximize-2.svg'

class MusicControls extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPlaying: false,
            currentSong: '',
            currentTime: 0
        }
    }

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

    getCurrentSong = () => {
        try{
            if(this.props.player.currentSong.title){
                return this.props.player.currentSong.title
            }
        } catch(err) {}
      
    };

    getCurrentSongDuration = () => {
        try{
            if(this.props.player.currentSong.duration){
                let duration = this.props.player.currentSong.duration;
                if(duration.charAt(0) === "0"){
                    duration = duration.substr(1);
                }
                return duration;
            }
        } catch(err) {}

    };

    getRawDuration = () => {
        try {
            return this.props.player.ytplayer.getDuration();
        } catch(err) {

        }
    };

    getCurrentTime = () => {
        try {
            return Math.round(this.props.player.ytplayer.getCurrentTime());
        } catch(err) {

        }
    };

    onSeekerChange = (event) => {

        this.props.setCurrentTime(this.formatTime(event.target.value));
        this.props.player.ytplayer.seekTo(event.target.value);
        //implement seeker changing time and the rest changing according to that
    };

    
    render() {
        return (
            <div className='music-controls-wrapper col'>
                <div className="music-seeker-wrapper col">
                    <div className="music-seeker">
                        <input
                            type="range" 
                            className="music-seek-bar"
                            min={0}
                            max={this.getRawDuration()}
                            onChange={this.onSeekerChange}
                        />
                        <div className="progress-bar" style={{width: `${(this.getCurrentTime()/this.getRawDuration()) *100}%`}}> </div>
                    </div>
                    <div className="music-seeker-time-wrapper">
                        <p className="music-current-time music-duration-text">{this.props.player.currentTime}</p>
                        <p className="music-end-time music-duration-text">{this.getCurrentSongDuration()}</p>
                    </div>


                </div>
                <div className="current-music-details-wrapper col">
                    <p className="current-music-text">Currently playing</p>
                    <p className="current-music-details">{this.getCurrentSong()}</p>
                </div>
                <div className="music-controls">
                    <img src={Heart} alt="" className="like-button secondary-control"/>
                    {this.props.player.isPlaying
                        ? <img className='pause-button primary-control' src={Pause} alt="pause-button" onClick={() => this.props.togglePlay(false)}/>
                        : <img className='play-button primary-control' src={Play} alt="play-button" onClick={() => this.props.togglePlay(true)}/>
                    }
                    <img src={Skip} alt="" className="skip-button secondary-control"/>

                    <img
                        src={this.props.player.isVisible ? Minimize : Maximize}
                        alt="" className="player-control-min-max"
                        onClick={() => this.props.togglePlayerWindow(this.props.player.isVisible)}
                    />
                </div>
                <div className="player-controls">

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        player: state.player
    })
};

export default connect(mapStateToProps, {togglePlay, setCurrentTime, togglePlayerWindow})(MusicControls);
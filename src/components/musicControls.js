import React, {Component} from 'react';


import './musicControls.css';
import Play from '../img/play.svg';
import Pause from '../img/pause.svg';
import Heart from '../img/heart.svg';
import Skip from '../img/skip-forward.svg';

class MusicControls extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPlaying: false
        }
    }

    getCurrentSong = () => {
      if(this.props.playlist){
          return this.props.playlist[0].title;
      }
    };

    
    render() {
        return (
            <div className='music-controls-wrapper col'>
                <div className="music-seeker-wrapper col">
                    <div className="music-seeker"></div>
                    <div className="music-seeker-time-wrapper">
                        <p className="music-current-time music-duration-text">0:00</p>
                        <p className="music-end-time music-duration-text">3:14</p>
                    </div>


                </div>
                <div className="current-music-details-wrapper col">
                    <p className="current-music-text">Currently playing</p>
                    <p className="current-music-details">{this.getCurrentSong()}</p>
                </div>
                <div className="music-controls">
                    <img src={Heart} alt="" className="like-button secondary-control"/>
                    {this.state.isPlaying
                        ? <img className='pause-button primary-control' src={Pause} alt="pause-button"/>
                        : <img className='play-button primary-control' src={Play} alt="play-button"/>
                    }
                    <img src={Skip} alt="" className="skip-button secondary-control"/>
                </div>
            </div>
        );
    }
}

export default MusicControls;
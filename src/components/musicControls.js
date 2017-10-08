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

    
    render() {
        return (
            <div className='music-controls-wrapper'>
                <img src={Heart} alt="" className="like-button secondary-control"/>
                {this.state.isPlaying
                    ? <img className='pause-button primary-control' src={Pause} alt="pause-button"/>
                    : <img className='play-button primary-control' src={Play} alt="play-button"/>
                }
                <img src={Skip} alt="" className="skip-button secondary-control"/>
            </div>
        );
    }
}

export default MusicControls;
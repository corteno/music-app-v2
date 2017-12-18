import React, {Component} from 'react';

import './playlistItem.css'
import DeleteSvg from '../img/trash-2.svg';

class PlaylistItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minDistance: 100,
            startTouchPos: 0
        }
    }

    //make the ontouch functions here and convert this into a component

    onTouchStart = (event) => {
        //console.log('start', event.touches[0].clientX);
        this.setState({startTouchPos: event.touches[0].clientX});
    };

    onTouchMove = (event) => {
        //console.log(event.touches[0].clientX);
    };

    onTouchEnd = (event) => {
        //console.log(this.state.startTouchPos, event);
    };

    render() {
        return (
            <li className="playlist-item"
                onTouchStart={(e) => this.onTouchStart(e)}
                onTouchMove={(e) => this.onTouchMove(e)}
                onTouchEnd={(e) => this.onTouchEnd(e)}
            >
                <div className="playlist-img-wrapper">
                    <img src={this.props.song.thumbnail} alt="" className="playlist-item-img"/>
                </div>
                <div className="playlist-content-wrapper col">
                    <p className="playlist-content-name">{this.props.song.title}</p>
                    <p className="playlist-content-duration">{this.props.song.duration}</p>
                </div>
                <div className="playlist-item-delete"
                     onClick={() => this.props.deletePlaylistItem(this.props.song._id)}>
                    <img src={DeleteSvg} alt=""/>
                </div>
            </li>
        );
    }

}

export default PlaylistItem;
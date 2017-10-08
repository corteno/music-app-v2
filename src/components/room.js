import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from './header';
import MusicControls from './musicControls';
import Playlist from './playlist';
import {getRoom} from '../actions/';

import './room.css';


class Room extends Component {
    constructor(props){
        super(props);

    }

    componentWillMount() {
        this.props.getRoom(this.props.match.params.id, '');
    }
    
    render() {
        return (
            <div className='room-wrapper'>
                <Header />
                <Playlist />
                <MusicControls />
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
import {ADD_SONG, DELETE_SONG} from '../actions';
import io from 'socket.io-client';
import RootApiUrl from '../utils/RootApiUrl';

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG:
            state.emit('addSong', {
                roomId: action.payload.data.roomId
            });
            return state;

        case DELETE_SONG:
            state.emit('removeSong', {
                roomId: action.payload.data.roomId
            });
            return state;

        default:
            return state;
    }
};

const initialState = io.connect(RootApiUrl);
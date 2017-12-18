import {ADD_SONG} from '../actions';
import io from 'socket.io-client';
import RootApiUrl from '../utils/RootApiUrl';

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG:
            state.emit('addSong', {
                roomId: action.payload.data.roomId
            });
            return state;

        default:
            return state;
    }
};

const initialState = io.connect(RootApiUrl);
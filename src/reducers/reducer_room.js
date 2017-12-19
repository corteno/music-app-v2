import {GET_ROOM, DELETE_SONG, ADD_SONG, GET_PLAYLIST, REFRESH_PLAYLIST} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOM:
            return action.payload.data;

        case GET_PLAYLIST:
            return state;
            
        case ADD_SONG:
            return {
                ...state,
                playlist: action.payload.data.playlist
            };

        case REFRESH_PLAYLIST:
            return {
                ...state,
                playlist: action.payload.data.playlist
            };

        case DELETE_SONG:
            return {
                ...state,
                playlist: action.payload.data.playlist
            };

        default:
            return state;
    }
};
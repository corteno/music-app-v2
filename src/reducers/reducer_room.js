import {GET_ROOM, DELETE_SONG, ADD_SONG, GET_PLAYLIST} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOM:
            console.log('get room');
            return action.payload.data;

        case GET_PLAYLIST:
            return state;
            
        case ADD_SONG:
            return {
                ...state,
                playlist: action.payload.data
            };

        case DELETE_SONG:
            return {
                ...state,
                playlist: action.payload.data
            };

        default:
            return state;
    }
};
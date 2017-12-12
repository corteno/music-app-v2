import {SET_CURRENT_SONG, SET_PLAYER, SET_CURRENT_TIME, TOGGLE_PLAY, TOGGLE_PLAYER_WINDOW, SET_ISPLAYING, DELETE_SONG, ADD_SONG} from '../actions';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload
            };

        case SET_PLAYER:
            return {
                ...state,
                ytplayer: action.payload
            };

        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            };

        case TOGGLE_PLAY:
            if(action.payload) {
                state.ytplayer.playVideo();
            } else {
                state.ytplayer.pauseVideo();
            }

            return {
                ...state,
                isPlaying: action.payload
            };

        case SET_ISPLAYING:
            return {
                ...state,
                isPlaying: action.payload
            };

        case DELETE_SONG:
            console.log(action.payload);
            if(action.payload.data){
                if(!action.payload.data.includes(state.currentSong)){
                    return {
                        ...state,
                        currentSong: action.payload.data[0]
                    }
                }
            }

            return state;

        case ADD_SONG:
            if(action.payload.data.length === 1){
                return {
                    ...state,
                    currentSong: action.payload.data[0]
                }
            }
            return state;

        case TOGGLE_PLAYER_WINDOW:
            return {
                ...state,
                isVisible: !action.payload
            };

        default:
            return state;
    }
};

const initialState = {
    ytplayer: '',
    currentSong: 'No song',
    currentTime: '0:00',
    isPlaying: false,
    volume: 100,
    isVisible: true
};
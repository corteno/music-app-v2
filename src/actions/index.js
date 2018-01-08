import axios from 'axios';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import YTFormat from 'youtube-duration-format';

import ROOT_API_URL from '../utils/RootApiUrl';
import API_KEY from '../utils/ApiKey';

export const SET_USER = 'set_user';
export const GET_USER = 'get_user';
export const GET_ROOMS = 'get_rooms';
export const GET_ROOM = 'get_room';
export const CREATE_ROOM = 'create_room';
export const SEARCH = 'search';
export const ADD_SONG = 'add_song';
export const GET_PLAYLIST = 'get_playlist';
export const DELETE_SONG = 'delete_song';
export const SET_CURRENT_SONG = 'set_current_song';
export const SET_PLAYER = 'set_player';
export const SET_CURRENT_TIME = 'set_current_time';
export const TOGGLE_PLAY = 'toggle_play';
export const TOGGLE_PLAYER_WINDOW = 'toggle_player_window';
export const SET_ISPLAYING = 'is_playing';
export const REFRESH_PLAYLIST = 'refresh_playlist';
export const REGISTER_USER = 'register_user';
export const RESET_LOGIN_MESSAGE = 'reset_login_message';
export const SWITCH_LOGIN_FORM = 'switch_login_form';


const YT_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YT_API_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

export const getUser = () => {
    const token = jwt.decode(localStorage.getItem('user'));

    return {
        type: GET_USER,
        payload: token.data ? token.data : 'No user data'
    }
};

export const getRooms = () => {
    const request = axios.get(`${ROOT_API_URL}/rooms`);
    return {
        type: GET_ROOMS,
        payload: request
    }
};

export const getRoom = (id, password) => {
    const request = axios.post(`${ROOT_API_URL}/room/${id}`, {password});

    return {
        type: GET_ROOM,
        payload: request
    }
};

export const createRoom = (room) => {
    const request = axios.post(`${ROOT_API_URL}/room`, {
        id: shortid.generate(),
        name: room.name,
        password: room.password,
        owner: room.owner,
        isPublic: room.isPublic
    });

    return {
        type: CREATE_ROOM,
        payload: request
    }
};

export const search = (params) => {
    const request = axios.get(YT_API_URL, {params: params})
        .then((response) => {
            let videosArray = [];

            response.data.items.map((video) => {
                let videoDetails = {};


                //For some reason The Youtube API sends back a channel among the videos, no idea why
                if (!video.id.channelId) {
                    videoDetails.title = video.snippet.title;
                    videoDetails.thumbnail = video.snippet.thumbnails.default.url;
                    videoDetails.id = video.id.videoId;

                    videosArray.push(videoDetails);
                }

            });

            let IDs = '';
            videosArray.map((video) => {
                return IDs += video.id + ',';
            });

            let videoParams = {
                part: 'contentDetails',
                key: API_KEY,
                id: IDs
            };


            return axios.get(YT_API_URL_VIDEOS, {params: videoParams})
                .then((response) => {
                    for (let i = 0; i < videosArray.length; i++) {
                        //Sometimes there is not contentDetails, no clue why
                        if (typeof response.data.items[i] !== 'undefined') {
                            videosArray[i].duration = YTFormat(response.data.items[i].contentDetails.duration);
                            videosArray[i].rawDuration = response.data.items[i].contentDetails.duration;
                        } else {
                            videosArray[i].duration = null;
                        }

                    }
                    return videosArray;

                })
                .catch((e) => {
                    console.log(e);
                });

        })
        .catch((e) => {
            console.log(e);
        });

    return {
        type: SEARCH,
        payload: request
    }
};

export const addSong = (song, roomId) => {
    const request = axios.post(`${ROOT_API_URL}/song/${roomId}`, song);

    return {
        type: ADD_SONG,
        payload: request
    }
};

export const getPlaylist = (room) => {
    return {
        type: GET_PLAYLIST,
        payload: room.playlist
    }
};

export const deleteSong = (roomId, songId) => {
    const request = axios.delete(`${ROOT_API_URL}/song/${roomId}/${songId}`);

    return {
        type: DELETE_SONG,
        payload: request
    }
};

export const setCurrentSong = (song) => {
    return {
        type: SET_CURRENT_SONG,
        payload: song
    }
};

export const setPlayer = (player) => {
    return {
        type: SET_PLAYER,
        payload: player
    }
};

export const setCurrentTime = (time) => {
    return {
        type: SET_CURRENT_TIME,
        payload: time
    }
};

export const togglePlay = (isPlaying) => {
    return {
        type: TOGGLE_PLAY,
        payload: isPlaying
    }
};

export const togglePlayerWindow = (state) => {
    return {
        type: TOGGLE_PLAYER_WINDOW,
        payload: state
    }
};

export const setIsPlaying = (isPlaying) => {
    return {
        type: SET_ISPLAYING,
        payload: isPlaying
    }
};

export const refreshPlaylist = (roomId) => {
    const request = axios.get(`${ROOT_API_URL}/playlist/${roomId}`);
    return {
        type: REFRESH_PLAYLIST,
        payload: request
    }

};

export const registerUser = (user) => {
    console.log(user);
    const request = axios.post(`${ROOT_API_URL}/user/`, {
        email: user.email,
        username: user.username,
        password: user.password
    });

    return {
        type: REGISTER_USER,
        payload: request
    }

};

export const resetLoginMessage = () => {
    return {
        type: RESET_LOGIN_MESSAGE,
        payload: ''
    }
};

export const switchLoginForm = (isLogin) => {
    return {
        type: SWITCH_LOGIN_FORM,
        payload: isLogin
    }
};
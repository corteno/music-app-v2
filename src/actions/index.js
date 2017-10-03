import axios from 'axios';
import jwt from 'jsonwebtoken';

import ROOT_API_URL from '../utils/AuthService';

export const SET_USER = 'set_user';
export const GET_USER = 'get_user';
export const GET_ROOMS = 'get_rooms';
export const GET_ROOM = 'get_room';

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

export const getRoom = (id) => {
    const request = axios.get(`${ROOT_API_URL}/room/${id}`);

    return {
        type: GET_ROOM,
        payload: request
    }
};

export const createRoom = (name, password) => {
    const request = axios.post();
};
import axios from 'axios';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';

import ROOT_API_URL from '../utils/RootApiUrl';

export const SET_USER = 'set_user';
export const GET_USER = 'get_user';
export const GET_ROOMS = 'get_rooms';
export const GET_ROOM = 'get_room';
export const CREATE_ROOM = 'create_room';

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
    const request = axios.post(`${ROOT_API_URL}/room`,{
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
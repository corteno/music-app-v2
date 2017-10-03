import {GET_ROOMS, GET_ROOM} from '../actions';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOMS:
            return action.payload.data.rooms;
        case GET_ROOM:
            return action.payload.data[0];

        default:
            return state;
    }
};
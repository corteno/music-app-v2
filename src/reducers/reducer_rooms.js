import {GET_ROOMS, GET_ROOM, CREATE_ROOM} from '../actions';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOMS:
            return action.payload.data;
        case GET_ROOM:
            return action.payload.data[0];
        case CREATE_ROOM:
            if (action.payload.response) {
                // If something went wrong
                console.log('wrong');
                return state;
            } else {
                //If everything went well
                return [...state, action.payload.data];
            }


        default:
            return state;
    }
};
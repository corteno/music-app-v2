import {GET_ROOMS, CREATE_ROOM} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOMS:
            return action.payload.data;

        case CREATE_ROOM:
            if (action.payload.response) {
                // If something went wrong
                console.log('wrong');
                return state.rooms;
            } else {
                //If everything went well
                return [...state.rooms, action.payload.data];
            }

        default:
            return state;
    }
};
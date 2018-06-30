import {GET_ROOMS, CREATE_ROOM} from '../actions';

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload.data
            };

        case CREATE_ROOM:
            if (action.payload.response) {
                // If something went wrong
                console.log(action.payload.response.data.message);
                return {
                    ...state,
                    message: action.payload.response.data.message
                }
            } else {
                //If everything went well
                return {
                    ...state,
                    rooms: [...state.rooms, action.payload.data]
                };
            }

        default:
            return state;
    }
};

let initialState = {
    rooms: [],
    message: ''
};
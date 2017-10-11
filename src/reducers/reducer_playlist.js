import {ADD_SONG} from '../actions/';

export default (state ={}, action) => {
    switch (action.type){
        case ADD_SONG:
            console.log(action.payload);
            return state;


        
        default:
            return state;
    }
};
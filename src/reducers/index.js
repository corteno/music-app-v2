import {combineReducers} from 'redux';

import UserReducer from './reducer_user';
import RoomsReducer from './reducer_rooms';
import RoomReducer from './reducer_room';
import SearchReducer from './reducer_search';


const rootReducer = combineReducers({
    user: UserReducer,
    rooms: RoomsReducer,
    room: RoomReducer,
    search: SearchReducer
});

export default rootReducer;

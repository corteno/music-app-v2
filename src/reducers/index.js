import {combineReducers} from 'redux';

import UserReducer from './reducer_user';
import RoomsReducer from './reducer_rooms';
import RoomReducer from './reducer_room';
import SearchReducer from './reducer_search';
import PlayerReducer from './reducer_player';
import SocketReducer from './reducer_socket';
import LoginReducer from './reducer_login';


const rootReducer = combineReducers({
    user: UserReducer,
    rooms: RoomsReducer,
    room: RoomReducer,
    search: SearchReducer,
    player: PlayerReducer,
    socket: SocketReducer,
    login: LoginReducer
});

export default rootReducer;

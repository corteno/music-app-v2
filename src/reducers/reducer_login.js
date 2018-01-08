import {REGISTER_USER, RESET_LOGIN_MESSAGE, SWITCH_LOGIN_FORM} from '../actions';

export default (state = initState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            if(action.error){
                return {
                    isLogin: false,
                    message: action.payload.response.data.message
                }
            } else {
                return {
                    isLogin: true,
                    message: 'Successful registration!'
                }
            }

        case RESET_LOGIN_MESSAGE:
            return {
                ...state,
                message: ''
            };

        case SWITCH_LOGIN_FORM:
            return {
                ...state,
                isLogin: !action.payload
            };

        default:
            return state;
    }
};

const initState = {
    isLogin: true,
    message: ''
};
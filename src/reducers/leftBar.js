import { LEFTBAR_STATE } from './constants/leftBar'

const initialState = {
    leftBar : {
        visible : false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {

        case LEFTBAR_STATE :
            return {
                ...state,...action.payload.leftBar
            };

        default: return state;
    }
}
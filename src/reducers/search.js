import { SEARCH_DATA } from './../reducers/constants/search'

const initialState = {
    filter : '',
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SEARCH_DATA :
            return {
                ...state,...action.payload
            };

        default: return state;
    }
}

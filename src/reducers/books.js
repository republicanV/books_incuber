import {
    SET_BOOKS_DATA_IN_PROGRESS,
    SET_BOOKS_DATA_SUCCESS,
    SET_BOOKS_DATA_FAILED,
    CHANGE_BOOK,
    DELETE_BOOK
} from './constants/books'

const initialState = {
    books : [],
    loaded : false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_BOOKS_DATA_IN_PROGRESS :
            return {
                ...state,...action.payload
            };

        case SET_BOOKS_DATA_SUCCESS :
            return {
                ...state,...action.payload
            };

        case SET_BOOKS_DATA_FAILED :
            return {
                ...state,...action.payload
            };
        case CHANGE_BOOK : {
            return {
                ...state,...action.payload
            };
        }
        case DELETE_BOOK : {

            return {
                books : action.payload.books,
                loaded : state.loaded
            };
        }

        default: return state;
    }
}
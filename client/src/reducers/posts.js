import {FETCH,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes'
export default (posts = [] ,action) => {
    switch(action.type){
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }
}
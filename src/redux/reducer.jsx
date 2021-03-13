import {
  ADD_ITEM,
  DELETE_ITEM,
} from './actions';

const INITIAL_STATE = {
  wishList: [],
};

// Complete the three cases below
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (state.wishList.length > 0) {
        console.log(state.wishList)
        state.wishList.push(action.payload);
      } else {
        state.wishList = [action.payload]
      }
      return {
        wishList: state.wishList,
      };
    case DELETE_ITEM:
      let newWishList = state.wishList.filter(ele => ele.id !== action.payload.id)
      state.wishList = newWishList
      return {
        wishList: state.wishList,
      };
    default:
      return {
        wishList: state.wishList,
      };
  }
};

export default reducer;
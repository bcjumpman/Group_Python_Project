const GET_USER = "profilePage/GET_USER";
const ADD_HEADER = "profilePage/ADD_HEADER";

export const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const profileHeader = (image) => ({
  type: ADD_HEADER,
  image,
});

export const getUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const userId = await res.json();
    dispatch(getUser(userId));
    return userId;
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};

const initialState = { userProfile: {} };

export default function profilePageReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = { ...state };
      newState = { ...state.userProfile };
      newState.userProfile = action.user;
      return newState;
    case ADD_HEADER:
      newState = {
        ...state,
        userProfile: { ...state.userProfile },
      };
      newState.userProfile.header_image_url = action.image;
      return newState;
    default:
      return state;
  }
}

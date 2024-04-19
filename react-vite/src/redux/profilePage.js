const GET_USER = "profilePage/GET_USER";
const EDIT_USER = "profilePage/EDIT_USER";

export const getUser = (user) => ({
  type: GET_USER,
  user,
});
export const editUser = (user) => ({
  type: EDIT_USER,
  user,
});

export const getUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/profile/${userId}`);
  if (res.ok) {
    const userId = await res.json();
    dispatch(getUser(userId));
    return userId;
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};
export const editUserThunk = (userId, updatedUserData) => async (dispatch) => {
  const res = await fetch(`/api/profile/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUserData),
  });
  if (res.ok) {
    const editedUserData = await res.json();
    dispatch(editUser(editedUserData));
    return editedUserData;
  }
};

const initialState = { userProfile: {}, user: {} };

export default function profilePageReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = { ...state };
      // newState = { ...state.userProfile };
      newState.userProfile = action.user;
      return newState;
    case EDIT_USER: {
      newState = { ...state };
      newState.user[action.user.id] = {
        ...newState.user[action.user.id],
        ...action.user,
      };
      return newState;
    }
    default:
      return state;
  }
}

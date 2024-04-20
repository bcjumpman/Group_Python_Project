const GET_USER = "profilePage/GET_USER";
const EDIT_USER = "profilePage/EDIT_USER";
const DELETE_USER = "profilePage/DELETE_USER";

export const getUser = (userId) => ({
  type: GET_USER,
  userId,
});
export const editUser = (userId) => ({
  type: EDIT_USER,
  userId,
});
export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId,
});

export const getUserThunk = (userId) => async (dispatch) => {
  // console.log(userId);
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const givenUser = await res.json();
    dispatch(getUser(givenUser));
    return givenUser;
    // } else {
    //   const data = await res.json();
    //   if (data.errors) return data;
  }
};
export const editUserThunk = (userId, updatedUserData) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
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
export const deleteUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteUser(userId));
  }
};

const initialState = {};

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
    case DELETE_USER: {
      newState = { ...state };
      delete newState.user[action.user.id];
      return newState;
    }
    default:
      return state;
  }
}

const GET_SONG_COMMENTS = "comments/GET_SONG_COMMENTS";
const GET_USER_COMMENT = "comments/GET_SONG_COMMENT";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const loadSongComments = (comments) => {
  return {
    type: GET_SONG_COMMENTS,
    comments,
  };
};
const loadUserComments = (comments) => {
  return {
    type: GET_USER_COMMENT,
    comments,
  };
};
const createComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};
const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};
const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

export const loadSongCommentsThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/comments`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadSongComments(comments));
    return comments;
  }
};
export const loadUserCommentsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/comments`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadUserComments(comments));
    return comments;
  }
};
export const createCommentThunk = (songId, newComment) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
  if (res.ok) {
    const createdComment = await res.json();
    dispatch(createComment(createdComment));
    return createdComment;
  }
};
export const editCommentThunk = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const editedComment = await res.json();
    dispatch(editComment(editedComment));
  }
};
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deletedComment = await res.json();
    dispatch(deleteComment(commentId));
    return deletedComment;
  }
};

const initialState = {
  song: {},
  user: {},
};

export default function commentReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_SONG_COMMENTS:
      newState.song = {};
      if (Array.isArray(action.comments)) {
        action.comments.forEach((comment) => {
          newState.song[comment.id] = comment;
        });
      }
      return newState;
    case GET_USER_COMMENT:
      newState.user = {};
      Object.values(action.comments).forEach((comment) => {
        newState.user[comment.id] = comment;
      });
      return newState;
    case CREATE_COMMENT:
      newState.song = { ...state.song, [action.comment.id]: action.comment };
      return newState;
    case EDIT_COMMENT:
      if (newState.song[action.comment.id]) {
        newState.song[action.comment.id] = {
          ...newState.song[action.comment.id],
          ...action.comment,
        };
      }
      if (newState.user[action.comment.id]) {
        newState.user[action.comment.id] = {
          ...newState.user[action.comment.id],
          ...action.comment,
        };
      }
      return newState;
    case DELETE_COMMENT:
      newState.song = { ...state.song };
      delete newState.song[action.commentId];
      if (
        Object.values(newState.user).length &&
        newState.user[action.commentId]
      ) {
        newState.user = { ...state.user };
        delete newState.user[action.commentId];
      }
      return newState;
    default:
      return state;
  }
}

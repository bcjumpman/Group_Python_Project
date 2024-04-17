const GET_SONGS = "songs/GET_SONGS";
const GET_SONG = "songs/GET_SONG";
const CREATE_SONG = "songs/CREATE_SONG";
const EDIT_SONG = "songs/EDIT_SONG";
const DELETE_SONG = "songs/DELETE_SONG";
const ADD_LIKE = "songs/ADD_LIKE";
const DELETE_LIKE = "songs/DELETE_LIKE";
const PLAY_SONG = "songs/PLAY_SONG";
const RESET_SINGLE_SONG = "songs/RESET_SINGLE_SONG";
const IS_PLAYING = "songs/IS_PLAYING";
const SET_PLAYER_REF = "songs/SET_PLAYER_REF";
const SET_CURRENT_TIME = "songs/SET_CURRENT_TIME";

const GET_USER_SONGS = "songs/GET_USER_SONGS";
const GET_USER_LIKED_SONGS = "songs/GET_USER_LIKED_SONGS";

const loadSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});
const loadUserSongs = (songs) => ({
  type: GET_USER_SONGS,
  songs,
});
const loadSong = (song) => ({
  type: GET_SONG,
  song,
});
const createSong = (song) => ({
  type: CREATE_SONG,
  song,
});
const editSong = (song) => ({
  type: EDIT_SONG,
  song,
});
const deleteSong = (songId) => ({
  type: DELETE_SONG,
  songId,
});
const addLike = (songId, current_user, song) => ({
  type: ADD_LIKE,
  payload: { songId, current_user, song },
});
const deleteLike = (songId, current_user, userId) => ({
  type: DELETE_LIKE,
  payload: { songId, current_user, userId },
});
export const playSong = (song) => ({
  type: PLAY_SONG,
  song,
});
export const getUserLikedSongs = (songs) => ({
  type: GET_USER_LIKED_SONGS,
  songs,
});
export const resetSingleSong = () => ({
  type: RESET_SINGLE_SONG,
});
export const isPlaying = (bool) => ({
  type: IS_PLAYING,
  bool,
});
export const setPlayerRef = (ref) => ({
  type: SET_PLAYER_REF,
  ref,
});
export const setCurrTime = (time) => ({
  type: SET_CURRENT_TIME,
  time,
});

export const getSongsThunk = () => async (dispatch) => {
  const res = await fetch("api/songs");
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadSongs(songs));
    return songs;
  } else return res;
};
export const getUserSongsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/songs`);
  if (res.ok) {
    const songs = await res.json();
    dispatch(loadUserSongs(songs));
    return songs;
  } else return res;
};
export const getSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`);
  if (res.ok) {
    const song = await res.json();
    dispatch(loadSong(song));
    return song;
  }
};
export const createSongThunk = (data) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
    body: data,
  });
  if (res.ok) {
    const createdSong = await res.json();
    dispatch(createSong(createdSong));
    return createdSong;
  } else {
    const data = res.json();
    if (data.errors) {
      return data;
    }
  }
};
export const editSongThunk = (song, songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    body: song,
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  } else {
    const data = res.json();
    if (data.errors) {
      return data;
    }
  }
};
export const deleteSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deletedSong = await res.json();
    dispatch(deleteSong(songId));
    return deletedSong;
  } else {
    const data = res.json();
    if (data.errors) {
      return data;
    }
  }
};
export const addLikeThunk = (songId, current_user) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/likes`, {
    method: "POST",
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(addLike(songId, current_user, song));
  }
};
export const deleteLikeThunk =
  (songId, current_user, userId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}/likes`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteLike(songId, current_user, userId));
    }
  };

const initialState = {
  allSongs: {},
  singleSong: {},
  userSongs: {},
  userLikedSongs: {},
  playSong: {},
  isPlaying: false,
  currentTime: 0,
};

export default function songReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_SONGS: //Get all songs
      newState = { ...state };
      newState.allSongs = action.songs;
      return newState;
    case GET_USER_SONGS: //Get all user songs
      newState = { ...state };
      newState.userSongs = action.songs;
      return newState;
    case GET_SONG: //Get one song
      return { ...state, singleSong: action.song };
    case GET_USER_LIKED_SONGS: //Get user's liked songs
      return { ...state, userLikedSongs: action.songs };
    case CREATE_SONG: //Create song
      newState.allSongs = { ...state.allSongs, [action.song.id]: action.song };
      return newState;
    case EDIT_SONG: //Edit song
      return { ...state, singleSong: action.song };
    case DELETE_SONG: //Delete song
      newState.allSongs = { ...state.allSongs };
      delete newState.allSongs[action.songId];
      return newState;

    case PLAY_SONG: //Playing song
      return { ...state, playSong: action.song };
    case RESET_SINGLE_SONG:
      return { ...state, singleSong: {} };
    case IS_PLAYING:
      newState.isPlaying = action.bool;
      return newState;
    case SET_PLAYER_REF:
      newState["playerRef"] = action.ref;
      return newState;
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.time };
    default:
      return state;
  }
}

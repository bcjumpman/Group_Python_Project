import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SongUpdate from '../SongPage/EditSong'
import { deleteSongThunk } from '../../redux/song'
import { useModal } from '../../context/Modal';
import "./SongSorts.css"
import { useEffect } from 'react';


export default function AllSongsByUser() {
  const dispatch = useDispatch()
  let allSongs = useSelector((state) => state.song.allSongs.songs);
  const sessionUser = useSelector(state => state.session.user)

  const { closeModal } = useModal()
  // let user = useSelector(state => state.session.user ? state.session.user : null)

  const handleDeleteSong = songId => {
    dispatch(deleteSongThunk(songId))
    closeModal()
  }

  if (allSongs === undefined) {
    return
  } else {

    const userSongs = allSongs.filter((song) => song.user_id === sessionUser.id)
    return (
      <div className="song-card-container">
        {userSongs ? userSongs.map((song) => {
          return (
            <div className='song-card' key={song.id}>
              <div>
                <img className="song-card-cover-art" src={song.cover_art} alt="cover art for song" />
              </div>
              <div className='song-card-data'>
                <div className='song-card-headers'>
                  <Link to={`/songs/${song.id}`}><h4>{song.name}</h4></Link>
                  <span className='song-card-artist'>Uploaded by {song.artist}</span>
                </div>
                <div className='song-card-icon-stats'>
                  <span><FontAwesomeIcon icon={faComment} /> {song.comments}</span>
                  <span><FontAwesomeIcon icon={faPlay} /> {song.plays}</span>
                  <span><FontAwesomeIcon icon={faHeart} /> {song.likes}</span>
                </div>
              </div>
              <div className='edit-or-delete'>
                <OpenModalMenuItem
                  itemText='Edit Song'
                  className='edit-button'
                  modalComponent={<SongUpdate />}
                />
                <OpenModalMenuItem
                  itemText='Delete'
                  className='delete-button'
                  modalComponent={(
                    <div id='confirm-delete'>
                      <h2>Confirm Delete</h2>
                      <span>Are you sure you want to remove this song?</span>
                      <button id='delete-complete' type='button' onClick={() => handleDeleteSong(song.id)}>Yes (Delete Song)</button>
                      <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Song)</button>
                    </div>
                  )}
                />
              </div>
            </div>
          )
        }) : console.log(!userSongs)}
      </div>
    )
  }
}

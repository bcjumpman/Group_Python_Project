import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { getSongThunk } from '../../redux/song';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./SongSorts.css"
import { loadSongCommentsThunk } from '../../redux/comment';


export default function SongById({ props }){
  const dispatch = useDispatch()
  const song = props.song

  // dispatch(getSongThunk(props.song.id))

  if(song === undefined){
    return <h2>Can&apos;t find song with id of {song.id}</h2>
  } else {
    return (
      <div className="song-card-container">
        <div className='song-card'>
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
        </div>
      </div>
    )
  }
}

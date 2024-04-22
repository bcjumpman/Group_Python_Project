import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import { getSongThunk, getSongsThunk  } from '../../redux/song';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./SongSorts.css"

export default function SongById(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const song = useSelector(state => state.song.singleSong.song)

  useEffect(()=>{
    dispatch(getSongThunk(id))
    dispatch(getSongsThunk())
  }, [dispatch, id])

  if(song === undefined){
    return <h2>Can&apos;t find song with id of {song?.id}</h2>
  } else {
    return (
      <div className="song-card-container">
        <div className='song-card'>
          <div>
          <img className="song-card-cover-art" src={song?.cover_art} alt="cover art for song" />
          </div>
          <div className='song-card-data'>
            <div className='song-card-headers'>
            <Link to={`/songs/${song?.id}`}><h4>{song?.name}</h4></Link>
              <span className='song-card-artist'>Uploaded by {song?.artist}</span>
            </div>
            <div className='song-card-icon-stats'>
              <span><FontAwesomeIcon icon={faComment} /> {song?.comments.length}</span>
              <span><FontAwesomeIcon icon={faPlay} /> {song?.plays}</span>
              <span><FontAwesomeIcon icon={faHeart} /> {song?.likes}</span>
            </div>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../redux/song";
import { useEffect } from "react";
import "./Songs.css"


export default function AllSongsByUser(){
  let allSongs = useSelector((state) => state.song.allSongs.songs);
  const sessionUser = useSelector(state => state.session.user)

  if(allSongs === undefined){
    return
  } else {

    const userSongs = allSongs.filter((song) => song.user_id === sessionUser.id)
    return (
      <div className="song-card-container">
        {userSongs ? userSongs.map((song) => {
          return(
            <div className='song-card'>
              <div>
              <img className="song-card-cover-art" src={song.cover_art} alt="cover art for song" />
              </div>
              <div className='song-card-data'>
                <div className='song-card-headers'>
                  <h4>{song.name}</h4>
                  <span className='song-card-artist'>Uploaded by {song.artist}</span>
                </div>
                <div className='song-card-icon-stats'>
                  <span><FontAwesomeIcon icon={faComment} /> {song.comments}</span>
                  <span><FontAwesomeIcon icon={faPlay} /> {song.plays}</span>
                  <span><FontAwesomeIcon icon={faHeart} /> {song.likes}</span>
                </div>
              </div>
            </div>
          )
        }) : console.log(!userSongs)}
      </div>
    )
  }
}
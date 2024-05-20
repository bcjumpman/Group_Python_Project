import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css"


export default function FeaturedSong() {
  const dispatch = useDispatch();
  let allSongs = useSelector((state) => state.song.allSongs.songs);
  const userLikes = useSelector((state) => state.song.userLikedSongs);
  const currentUserId = useSelector((state) => state.session.user.id);

  const [randomSong, setRandomSong] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (allSongs && allSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      const selectedSong = allSongs[randomIndex];
      setRandomSong(selectedSong);
      setIsLiked(userLikes[selectedSong.id] || false);
      setLikeCount(selectedSong.likes || 0);
    }
  }, [allSongs, userLikes]);

  const song = allSongs[Math.floor(Math.random() * allSongs.length)]

  const handleLike = (e, songId) => {
    e.preventDefault()
    e.stopPropagation()

    if (!randomSong) return;

    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      dispatch(deleteLikeThunk(songId, currentUserId));
    } else {
      setLikeCount((prev) => prev + 1);
      dispatch(addLikeThunk(songId, currentUserId));
    }
    setIsLiked(!isLiked);
  };

  if (!randomSong) {
    return <div>Loading song or no song available...</div>;
  }

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
            <span onClick={(e) => handleLike(e)}>
            <FontAwesomeIcon icon={faHeart} /> {likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

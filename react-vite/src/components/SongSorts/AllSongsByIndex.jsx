// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import "./SongSorts.css"

// export default function AllSongsByIndex(){
//   let allSongs = useSelector((state) => state.song.allSongs.songs);
//   if(allSongs === undefined){
//     return
//   } else {
//     return (
//       <div className="song-card-container">
//         {allSongs ? allSongs.map((song) => {
//           return(
//             <div className='song-card' key={song.id}>
//               <div>
//               <img className="song-card-cover-art" src={song.cover_art} alt="cover art for song" />
//               </div>
//               <div className='song-card-data'>
//                 <div className='song-card-headers'>
//                 <Link to={`/songs/${song.id}`}><h4>{song.name}</h4></Link>
//                   <span className='song-card-artist'>Uploaded by {song.artist}</span>
//                 </div>
//                 <div className='song-card-icon-stats'>
//                   <span><FontAwesomeIcon icon={faComment} /> {song.comments}</span>
//                   <span><FontAwesomeIcon icon={faPlay} /> {song.plays}</span>
//                   <span><FontAwesomeIcon icon={faHeart} /> {song.likes}</span>
//                 </div>
//               </div>
//             </div>
//           )
//         }) : console.log(!allSongs)}
//       </div>
//     )
//   }
// }

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css";

export default function AllSongsByIndex() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song.allSongs.songs);
  const userLikes = useSelector((state) => state.song.userLikedSongs);
  const currentUserId = useSelector((state) => state.session.user.id);

  if (!allSongs) {
    return <div>Loading...</div>;
  }

  const [songs, setSongs] = useState(
    allSongs.map((song) => ({
      ...song,
      isLiked: userLikes[song.id],
      likeCount: song.likes,
    }))
  );

  useEffect(() => {
    setSongs(
      allSongs.map((song) => ({
        ...song,
        isLiked: userLikes[song.id],
        likeCount: song.likes,
      }))
    );
  }, [allSongs, userLikes]);

  const handleLike = (songId) => {
    const songIndex = songs.findIndex((song) => song.id === songId);
    const newSongs = [...songs];
    const song = newSongs[songIndex];

    if (song.isLiked) {
      song.likeCount--;
      dispatch(deleteLikeThunk(songId, currentUserId));
    } else {
      song.likeCount++;
      dispatch(addLikeThunk(songId, currentUserId));
    }
    song.isLiked = !song.isLiked;
    setSongs(newSongs);
  };

  return (
    <div className="song-card-container">
      {songs.map((song) => (
        <div className="song-card" key={song.id}>
          <div>
            <img
              className="song-card-cover-art"
              src={song.cover_art}
              alt="cover art for song"
            />
          </div>
          <div className="song-card-data">
            <div className="song-card-headers">
              <Link to={`/songs/${song.id}`}>
                <h4>{song.name}</h4>
              </Link>
              <span className="song-card-artist">
                Uploaded by {song.artist}
              </span>
            </div>
            <div className="song-card-icon-stats">
              <span>
                <FontAwesomeIcon icon={faComment} /> {song.comments}
              </span>
              <span>
                <FontAwesomeIcon icon={faPlay} /> {song.plays}
              </span>
              <span onClick={() => handleLike(song.id)}>
                <FontAwesomeIcon icon={faHeart} />
                {song.likeCount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

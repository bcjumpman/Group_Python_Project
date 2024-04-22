// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
// import { useSelector } from "react-redux";
// import { Link } from 'react-router-dom'
// import "./SongSorts.css"

// export default function TopSongByMostActivity(){
//   let allSongs = useSelector((state) => state.song.allSongs.songs);

//   if(allSongs === undefined){
//     return
//   } else {
//     const allSongsByActivity = allSongs.sort((b, a) => (a.plays + a.likes)  - (b.plays + b.lines))
//     const topSongByMostActivity = allSongsByActivity.slice(0,1)
//     return (
//       <div className="song-card-container">
//         {topSongByMostActivity ? topSongByMostActivity.map((song) => {
//           return(
//             <div className='song-card' key={song.id}>
//               <div>
//               <img className="song-card-cover-art" src={song.cover_art} alt="cover art for song" />
//               </div>
//               <div className='song-card-data'>
//                 <div className='song-card-headers'>
//                   <Link to={`/songs/${song.id}`}><h4>{song.name}</h4></Link>
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
//         }) : console.log(!topSongByMostActivity)}
//       </div>
//     )
//   }
// }

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
// import "./SongSorts.css";

// export default function TopSongByMostActivity() {
//   const dispatch = useDispatch();
//   let allSongs = useSelector((state) => state.song.allSongs.songs);
//   const userLikes = useSelector((state) => state.song.userLikedSongs);
//   const currentUserId = useSelector((state) => state.session.user.id);

//   if (allSongs === undefined) {
//     return;
//   }

//   const allSongsByActivity = allSongs.sort(
//     (b, a) => a.plays + a.likes - (b.plays + b.likes)
//   );
//   const topSong = allSongsByActivity[0];

//   const [isLiked, setIsLiked] = useState(userLikes[topSong.id]);
//   const [likeCount, setLikeCount] = useState(topSong.likes);

//   const handleClick = () => {
//     if (isLiked) {
//       setLikeCount(likeCount - 1);
//       dispatch(deleteLikeThunk(topSong.id, currentUserId));
//     } else {
//       setLikeCount(likeCount + 1);
//       dispatch(addLikeThunk(topSong.id, currentUserId));
//     }
//     setIsLiked(!isLiked);
//   };

//   return (
//     <div className="song-card-container">
//       <div className="song-card" key={topSong.id}>
//         <div>
//           <img
//             className="song-card-cover-art"
//             src={topSong.cover_art}
//             alt="cover art for song"
//           />
//         </div>
//         <div className="song-card-data">
//           <div className="song-card-headers">
//             <Link to={`/songs/${topSong.id}`}>
//               <h4>{topSong.name}</h4>
//             </Link>
//             <span className="song-card-artist">
//               Uploaded by {topSong.artist}
//             </span>
//           </div>
//           <div className="song-card-icon-stats">
//             <span>
//               <FontAwesomeIcon icon={faComment} /> {topSong.comments}
//             </span>
//             <span>
//               <FontAwesomeIcon icon={faPlay} /> {topSong.plays}
//             </span>
//             <span onClick={handleClick}>
//               <FontAwesomeIcon icon={faHeart} /> {likeCount}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css";

export default function TopSongByMostActivity() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song.allSongs.songs || []);
  const userLikes = useSelector((state) => state.song.userLikedSongs);
  const currentUserId = useSelector((state) => state.session.user.id);

  // Sorting songs by activity level
  const allSongsByActivity = allSongs.sort(
    (b, a) => a.plays + a.likes - (b.plays + b.likes)
  );
  const topSong = allSongsByActivity[0];

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Initialize state based on topSong once it is available
  useEffect(() => {
    if (topSong) {
      setIsLiked(userLikes[topSong.id] || false);
      setLikeCount(topSong.likes || 0);
    }
  }, [topSong, userLikes]);

  const handleClick = () => {
    if (!topSong) return; // Guard against no top song

    if (isLiked) {
      setLikeCount(likeCount - 1);
      dispatch(deleteLikeThunk(topSong.id, currentUserId));
    } else {
      setLikeCount(likeCount + 1);
      dispatch(addLikeThunk(topSong.id, currentUserId));
    }
    setIsLiked(!isLiked);
  };

  if (!topSong) {
    return <div>Loading top song or no songs available...</div>; // Handle no top song available
  }

  return (
    <div className="song-card-container">
      <div className="song-card" key={topSong.id}>
        <div>
          <img
            className="song-card-cover-art"
            src={topSong.cover_art}
            alt="cover art for song"
          />
        </div>
        <div className="song-card-data">
          <div className="song-card-headers">
            <Link to={`/songs/${topSong.id}`}>
              <h4>{topSong.name}</h4>
            </Link>
            <span className="song-card-artist">
              Uploaded by {topSong.artist}
            </span>
          </div>
          <div className="song-card-icon-stats">
            <span>
              <FontAwesomeIcon icon={faComment} /> {topSong.comments}
            </span>
            <span>
              <FontAwesomeIcon icon={faPlay} /> {topSong.plays}
            </span>
            <span onClick={handleClick}>
              <FontAwesomeIcon icon={faHeart} /> {likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

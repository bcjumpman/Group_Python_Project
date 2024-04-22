//

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlay,
//   faHeart as solidHeart,
//   faComment,
// } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
// import "./SongSorts.css";

// export default function FeaturedSong() {
//   const dispatch = useDispatch();
//   const allSongs = useSelector((state) => state.song.allSongs.songs);
//   const userLikes = useSelector((state) => state.song.userLikedSongs);
//   const currentUserId = useSelector((state) => state.session.user.id);

//   if (!allSongs) {
//     return <div>Loading...</div>;
//   }

//   // Selecting a random song
//   const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];

//   const [isLiked, setIsLiked] = useState(userLikes[randomSong.id]);
//   const [likeCount, setLikeCount] = useState(randomSong.likes);

//   useEffect(() => {
//     setIsLiked(userLikes[randomSong.id]);
//     setLikeCount(randomSong.likes);
//   }, [userLikes, randomSong]);

//   const handleLike = (songId) => {
//     if (isLiked) {
//       setLikeCount(likeCount - 1);
//       dispatch(deleteLikeThunk(songId, currentUserId));
//     } else {
//       setLikeCount(likeCount + 1);
//       dispatch(addLikeThunk(songId, currentUserId));
//     }
//     setIsLiked(!isLiked);
//   };

//   return (
//     <div className="song-card-container">
//       <div className="song-card">
//         <div>
//           <img
//             className="song-card-cover-art"
//             src={randomSong.cover_art}
//             alt="cover art for song"
//           />
//         </div>
//         <div className="song-card-data">
//           <div className="song-card-headers">
//             <Link to={`/songs/${randomSong.id}`}>
//               <h4>{randomSong.name}</h4>
//             </Link>
//             <span className="song-card-artist">
//               Uploaded by {randomSong.artist}
//             </span>
//           </div>
//           <div className="song-card-icon-stats">
//             <span>
//               <FontAwesomeIcon icon={faComment} /> {randomSong.comments}
//             </span>
//             <span>
//               <FontAwesomeIcon icon={faPlay} /> {randomSong.plays}
//             </span>
//             <span onClick={() => handleLike(randomSong.id)}>
//               <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />{" "}
//               {likeCount}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart as solidHeart,
  faComment,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css";

export default function FeaturedSong() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song.allSongs.songs);
  const userLikes = useSelector((state) => state.song.userLikedSongs);
  const currentUserId = useSelector((state) => state.session.user.id);

  const [randomSong, setRandomSong] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Set random song once allSongs is available
  useEffect(() => {
    if (allSongs && allSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      const selectedSong = allSongs[randomIndex];
      setRandomSong(selectedSong);
      setIsLiked(userLikes[selectedSong.id] || false);
      setLikeCount(selectedSong.likes || 0);
    }
  }, [allSongs, userLikes]);

  const handleLike = (songId) => {
    if (!randomSong) return; // Guard against no song selected

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
      <div className="song-card">
        <div>
          <img
            className="song-card-cover-art"
            src={randomSong.cover_art}
            alt="Cover art for song"
          />
        </div>
        <div className="song-card-data">
          <div className="song-card-headers">
            <Link to={`/songs/${randomSong.id}`}>
              <h4>{randomSong.name}</h4>
            </Link>
            <span className="song-card-artist">
              Uploaded by {randomSong.artist}
            </span>
          </div>
          <div className="song-card-icon-stats">
            <span>
              <FontAwesomeIcon icon={faComment} /> {randomSong.comments}
            </span>
            <span>
              <FontAwesomeIcon icon={faPlay} /> {randomSong.plays}
            </span>
            <span onClick={() => handleLike(randomSong.id)}>
              <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />{" "}
              {likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

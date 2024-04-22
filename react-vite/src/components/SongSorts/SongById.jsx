// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// // import { getSongThunk } from '../../redux/song';
// // import { useEffect } from 'react';
// import { useDispatch } from "react-redux";
// import "./SongSorts.css";
// import { addLikeThunk, deleteLikeThunk } from '../../redux/song';
// // import { loadSongCommentsThunk } from '../../redux/comment';

// export default function SongById({ props }) {
//   const dispatch = useDispatch();
//   const song = props.song;

//   // dispatch(getSongThunk(props.song.id))

//   if (song === undefined) {
//     return <h2>Can&apos;t find song with id of {song.id}</h2>;
//   } else {
//     return (
//       <div className="song-card-container">
//         <div className="song-card">
//           <div>
//             <img
//               className="song-card-cover-art"
//               src={song.cover_art}
//               alt="cover art for song"
//             />
//           </div>
//           <div className="song-card-data">
//             <div className="song-card-headers">
//               <Link to={`/songs/${song.id}`}>
//                 <h4>{song.name}</h4>
//               </Link>
//               <span className="song-card-artist">
//                 Uploaded by {song.artist}
//               </span>
//             </div>
//             <div className="song-card-icon-stats">
//               <span>
//                 <FontAwesomeIcon icon={faComment} /> {song.comments}
//               </span>
//               <span>
//                 <FontAwesomeIcon icon={faPlay} /> {song.plays}
//               </span>
//               <span>
//                 <FontAwesomeIcon icon={faHeart} /> {song.likes}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
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
import { useDispatch } from "react-redux";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css";

export default function SongById({ song }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false); // Default state assuming not liked
  const [likeCount, setLikeCount] = useState(0); // Default like count
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (song) {
      setIsLiked(song.isLiked || false);
      setLikeCount(song.likes || 0);
    }
  }, [song]);

  const handleLike = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await dispatch(deleteLikeThunk(song.id));
        setLikeCount((prev) => prev - 1); // Ensure state consistency
      } else {
        await dispatch(addLikeThunk(song.id));
        setLikeCount((prev) => prev + 1); // Ensure state consistency
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setError("Failed to update like status.");
      console.error(err);
    }
    setLoading(false);
  };

  if (!song) {
    return <div>Loading...</div>; // Changed to a more general loading state
  }

  return (
    <div className="song-card-container">
      <div className="song-card">
        <div>
          <img
            className="song-card-cover-art"
            src={song.cover_art}
            alt={song.name || "Song cover art"}
          />
        </div>
        <div className="song-card-data">
          <div className="song-card-headers">
            <Link to={`/songs/${song.id}`}>
              <h4>{song.name}</h4>
            </Link>
            <span className="song-card-artist">Uploaded by {song.artist}</span>
          </div>
          <div className="song-card-icon-stats">
            <span>
              <FontAwesomeIcon icon={faComment} /> {song.comments}
            </span>
            <span>
              <FontAwesomeIcon icon={faPlay} /> {song.plays}
            </span>
            <span onClick={handleLike} style={{ cursor: "pointer" }}>
              {loading ? (
                "Loading..." // Consider replacing with a spinner icon
              ) : (
                <>
                  <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />
                  {" " + likeCount}
                </>
              )}
            </span>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

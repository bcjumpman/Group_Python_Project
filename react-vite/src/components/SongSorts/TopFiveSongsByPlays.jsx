// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom"
// import "./SongSorts.css"

// export default function TopFiveSongsByPlays(){
//   let allSongs = useSelector((state) => state.song.allSongs.songs);

//   if(allSongs === undefined){
//     return
//   } else {
//     const allSongsByPlays = allSongs.sort((b, a) => a.plays - b.plays)
//     const topFiveSongsByPlays = allSongsByPlays.slice(0,5)
//     return (
//       <div className="song-card-container">
//         {topFiveSongsByPlays ? topFiveSongsByPlays.map((song) => {
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
//         }) : console.log(!topFiveSongsByPlays)}
//       </div>
//     )
//   }
// }

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
import "./SongSorts.css";

export default function TopFiveSongsByPlays() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song.allSongs.songs);
  const userLikes = useSelector((state) => state.song.userLikedSongs);
  const currentUserId = useSelector((state) => state.session.user.id);
  const [likes, setLikes] = useState([]); // Initialize here at the top level

  useEffect(() => {
    if (allSongs.length > 0) {
      const sortedSongs = allSongs
        .sort((b, a) => a.plays - b.plays)
        .slice(0, 5);
      const likesData = sortedSongs.map((song) => ({
        id: song.id,
        isLiked: userLikes[song.id],
        likeCount: song.likes,
      }));
      setLikes(likesData); // Set likes data based on sorted and sliced songs
    }
  }, [allSongs, userLikes]); // Dependency array to only rerun when allSongs or userLikes changes

  if (allSongs.length === 0) {
    return <div>Loading songs...</div>; // Handle loading state
  }

  const handleClick = (songId) => {
    const songIndex = likes.findIndex((song) => song.id === songId);
    const newLikes = [...likes];
    const song = newLikes[songIndex];

    if (song.isLiked) {
      song.likeCount--;
      dispatch(deleteLikeThunk(songId, currentUserId));
    } else {
      song.likeCount++;
      dispatch(addLikeThunk(songId, currentUserId));
    }
    song.isLiked = !song.isLiked;
    setLikes(newLikes);
  };

  return (
    <div className="song-card-container">
      {likes.map((like, index) => (
        <div className="song-card" key={like.id}>
          <div>
            <img
              className="song-card-cover-art"
              src={allSongs.find((song) => song.id === like.id)?.cover_art}
              alt="Cover art for song"
            />
          </div>
          <div className="song-card-data">
            <div className="song-card-headers">
              <Link to={`/songs/${like.id}`}>
                <h4>{allSongs.find((song) => song.id === like.id)?.name}</h4>
              </Link>
              <span className="song-card-artist">
                Uploaded by{" "}
                {allSongs.find((song) => song.id === like.id)?.artist}
              </span>
            </div>
            <div className="song-card-icon-stats">
              <span>
                <FontAwesomeIcon icon={faComment} /> {like.comments}
              </span>
              <span>
                <FontAwesomeIcon icon={faPlay} /> {like.plays}
              </span>
              <span onClick={() => handleClick(like.id)}>
                <FontAwesomeIcon icon={faHeart} /> {like.likeCount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

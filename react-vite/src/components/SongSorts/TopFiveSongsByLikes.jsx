import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import "./SongSorts.css"

export default function TopFiveSongsByLikes(){
  let allSongs = useSelector((state) => state.song.allSongs.songs);

  if(allSongs === undefined){
    return
  } else {
    const allSongsByLikes = allSongs.sort((b, a) => a.likes - b.likes)
    const TopFiveSongsByLike = allSongsByLikes.slice(0,5)
    return (
      <div className="song-card-container">
        {TopFiveSongsByLike ? TopFiveSongsByLike.map((song) => {
          return(
            <div className='song-card' key={song.id}>
              <div>
              <img className="song-card-cover-art" src={song.cover_art} alt="cover art for song" />
              </div>
              <div className='song-card-data'>
                <div className='song-card-headers'>
                <Link to={`/songs/${song.id}`}><h4>{song.name}</h4></Link >
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
        }) : console.log(!TopFiveSongsByLike)}
      </div>
    )
  }
}

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
// import "./SongSorts.css";

// export default function TopFiveSongsByLikes() {
//   const dispatch = useDispatch();
//   let allSongs = useSelector((state) => state.song.allSongs.songs);
//   const userLikes = useSelector((state) => state.song.userLikedSongs);
//   const currentUserId = useSelector((state) => state.session.user.id);

//   if (allSongs === undefined) {
//     return;
//   }

//   const allSongsByLikes = allSongs.sort((b, a) => a.likes - b.likes);
//   const topFiveSongsByLikes = allSongsByLikes.slice(0, 5);

//   const [likes, setLikes] = useState(
//     topFiveSongsByLikes.map((song) => ({
//       id: song.id,
//       isLiked: userLikes[song.id],
//       likeCount: song.likes,
//     }))
//   );

//   const handleClick = (songId) => {
//     const songIndex = likes.findIndex((song) => song.id === songId);
//     const newLikes = [...likes];
//     const song = newLikes[songIndex];

//     if (song.isLiked) {
//       song.likeCount--;
//       dispatch(deleteLikeThunk(songId, currentUserId));
//     } else {
//       song.likeCount++;
//       dispatch(addLikeThunk(songId, currentUserId));
//     }
//     song.isLiked = !song.isLiked;
//     setLikes(newLikes);
//   };

//   return (
//     <div className="song-card-container">
//       {topFiveSongsByLikes.map((song, index) => (
//         <div className="song-card" key={song.id}>
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
//               <span onClick={() => handleClick(song.id)}>
//                 <FontAwesomeIcon icon={faHeart} /> {likes[index].likeCount}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { addLikeThunk, deleteLikeThunk } from "../../redux/song";
// import "./SongSorts.css";

// export default function TopFiveSongsByLikes() {
//   const dispatch = useDispatch();
//   const allSongs = useSelector((state) => state.song.allSongs.songs || []);
//   const userLikes = useSelector((state) => state.song.userLikedSongs);
//   const currentUserId = useSelector((state) => state.session.user.id);

//   const [likes, setLikes] = useState([]);

//   useEffect(() => {
//     if (allSongs.length > 0) {
//       const allSongsByLikes = allSongs.sort((b, a) => a.likes - b.likes);
//       const topFiveSongsByLikes = allSongsByLikes.slice(0, 5);
//       const likesData = topFiveSongsByLikes.map((song) => ({
//         id: song.id,
//         isLiked: userLikes[song.id] || false,
//         likeCount: song.likes || 0,
//       }));
//       setLikes(likesData);
//     }
//   }, [allSongs, userLikes]);

//   const handleClick = (songId) => {
//     const songIndex = likes.findIndex((song) => song.id === songId);
//     if (songIndex === -1) return;

//     const newLikes = [...likes];
//     const song = newLikes[songIndex];

//     if (song.isLiked) {
//       song.likeCount--;
//       dispatch(deleteLikeThunk(songId, currentUserId));
//     } else {
//       song.likeCount++;
//       dispatch(addLikeThunk(songId, currentUserId));
//     }
//     song.isLiked = !song.isLiked;
//     setLikes(newLikes);
//   };

//   if (allSongs.length === 0) {
//     return <div>Loading songs...</div>; // Better loading state handling
//   }

//   return (
//     <div className="song-card-container">
//       {likes.map((like, index) => (
//         <div className="song-card" key={like.id}>
//           <div>
//             <img
//               className="song-card-cover-art"
//               src={allSongs.find((song) => song.id === like.id)?.cover_art}
//               alt="cover art for song"
//             />
//           </div>
//           <div className="song-card-data">
//             <div className="song-card-headers">
//               <Link to={`/songs/${like.id}`}>
//                 <h4>{allSongs.find((song) => song.id === like.id)?.name}</h4>
//               </Link>
//               <span className="song-card-artist">
//                 Uploaded by{" "}
//                 {allSongs.find((song) => song.id === like.id)?.artist}
//               </span>
//             </div>
//             <div className="song-card-icon-stats">
//               <span>
//                 <FontAwesomeIcon icon={faComment} /> {like.comments}
//               </span>
//               <span>
//                 <FontAwesomeIcon icon={faPlay} /> {like.plays}
//               </span>
//               <span onClick={() => handleClick(like.id)}>
//                 <FontAwesomeIcon icon={faHeart} /> {like.likeCount}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

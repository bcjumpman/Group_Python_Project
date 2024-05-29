// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// // import { getSongThunk } from "../../redux/song";
// // import { useEffect, useState } from "react";
// import { FeaturedSong } from "../SongSorts";
// import "./SongPage.css";
// import SongById from "../SongSorts/SongById";
// // import PlaylistPage from "../PlaylistPage";
// import { CommentsForSong } from "../Comments";

// export default function SongPage() {
//   const { id } = useParams();
//   // const dispatch = useDispatch()
//   // const [rerender, setRerender] = useState(false)

//   const song = useSelector((state) => state.song.singleSong.song);
//   // const songUrl = useSelector((state) => state.song.singleSong.song.song_url);
//   // console.log("SONG URL>>>", songUrl);

//   return (
//     <div className="page-container discover">
//       <div className="discover-page-left">
//         <div className="trending-section">
//           <h2>FEATURED ON MUSIC HAZE</h2>
//           <FeaturedSong />
//         </div>
//         <span className="h-breaker"></span>
//         <div className="song-info">
//           <SongById />
//         </div>
//         <span className="h-breaker"></span>
//         <h2>Comments</h2>
//         <div className="current-comments">
//           {song ? <CommentsForSong /> : null}
//         </div>
//       </div>
//       {/* <span className="v-breaker"></span>
//       <PlaylistPage /> */}
//     </div>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSongThunk, playSong } from "../../redux/song";
import { useParams } from "react-router-dom";
import { FeaturedSong } from "../SongSorts";
import "./SongPage.css";
import SongById from "../SongSorts/SongById";
import { CommentsForSong } from "../Comments";

export default function SongPage() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract song ID from URL

  // console.log("SONG PAGE: PARAM ID>>>", id);
  // Fetch the selected song when the component mounts or song ID changes
  useEffect(() => {
    dispatch(getSongThunk(id));
  }, [dispatch, id]);

  // Get the selected song from the Redux store
  const selectedSong = useSelector((state) => state.song.singleSong.song);
  // console.log("SONG PAGE: SELECTED SONG URL>>>", selectedSong?.song_url);
  // Play the selected song
  useEffect(() => {
    if (selectedSong && selectedSong?.song_url) {
      dispatch(playSong(selectedSong?.song_url));
    }
  }, [selectedSong, dispatch]);

  return (
    <div className="page-container discover">
      <div className="discover-page-left">
        <div className="trending-section">
          <h2>FEATURED ON MUSIC HAZE</h2>
          <FeaturedSong />
        </div>
        <span className="h-breaker"></span>
        <div className="song-info">
          <SongById />
        </div>
        <span className="h-breaker"></span>
        <h2>Comments</h2>
        <div className="current-comments">
          {selectedSong ? <CommentsForSong /> : null}
        </div>
      </div>
    </div>
  );
}

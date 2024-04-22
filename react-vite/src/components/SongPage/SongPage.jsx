import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getSongThunk } from "../../redux/song";
// import { useEffect } from "react";
import { FeaturedSong } from "../SongSorts";
import "./SongPage.css";

import SongById from "../SongSorts/SongById";
// import { loadSongCommentsThunk } from "../../redux/comment";

export default function SongPage() {
  const { id } = useParams();

  const allSongs = useSelector((state) => state.song.allSongs.songs);
  if (allSongs) {
  }
  const filteredSong = allSongs.filter((song) => song.id == id);
  const song = filteredSong[0];

  // const sessionUser = useSelector(state => state.session.user)

  console.log(song);
  return (
    <div className="page-container discover">
      <div className="discover-page-left">
        <div className="trending-section">
          <h2>FEATURED ON MUSIC HAZE</h2>
          <FeaturedSong />
        </div>
        <span className="h-breaker"></span>
        <div className="song-info">
          <SongById props={{ song }} />
        </div>
        <span className="h-breaker"></span>
        <h2>Comments</h2>
        <div className="comments-section">
          <div className="current-comments">{}</div>
        </div>
      </div>
      <span className="v-breaker"></span>
    </div>
  );
}

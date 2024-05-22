import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getSongThunk } from "../../redux/song";
// import { useEffect, useState } from "react";
import { FeaturedSong } from "../SongSorts";
import "./SongPage.css";
import SongById from "../SongSorts/SongById";
import PlaylistPage from "../PlaylistPage";
import { CommentsForSong } from "../Comments";

export default function SongPage() {
  // const { id } = useParams()
  // const dispatch = useDispatch()
  // const [rerender, setRerender] = useState(false)

  const song = useSelector((state) => state.song.singleSong.song);

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
        <div className="comments-container">
          <div className="current-comments">
            {song ? <CommentsForSong /> : null}
          </div>
        </div>
      </div>
      {/* <span className="v-breaker"></span>
      <PlaylistPage /> */}
    </div>
  );
}

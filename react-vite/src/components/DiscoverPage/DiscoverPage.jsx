import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../redux/song";
import { useEffect } from "react";
import {
  FeaturedSong,
  TopFiveSongsByLikes,
  TopFiveSongsByPlays,
  TopSongByMostActivity,
} from "../SongSorts";
import "./DiscoverPage.css";
import PlaylistPage from "../PlaylistPage";
// import { loadUserCommentsThunk } from "../../redux/comment";

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  dispatch(getSongsThunk())

  useEffect(() => {
    dispatch(getSongsThunk());
  }, [dispatch]);

  return (
    <div className="page-container discover">
      <div className="discover-page-left">
        <div className="trending-section">
          <h2>FEATURED ON MUSIC HAZE</h2>
          <FeaturedSong />
        </div>
        <span className="h-breaker"></span>
        <div className="trending-section">
          <h3>Most Trending Song on Music Haze</h3>
          <TopSongByMostActivity />
        </div>
        <span className="h-breaker"></span>
        <div className="top-five-section">
          <div className="discover-top-five">
            <h3>Top Five Most Liked Songs</h3>
            <TopFiveSongsByLikes />
          </div>
          <div className="discover-top-five">
            <h3>Top Five Most Played Songs</h3>
            <TopFiveSongsByPlays />
          </div>
        </div>
      </div>
      {/* <span className="v-breaker"></span>
      <PlaylistPage props={{ sessionUser }} /> */}
    </div>
  );
}

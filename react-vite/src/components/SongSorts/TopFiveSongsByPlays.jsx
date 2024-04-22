import { useState, useEffect } from "react";
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
  const [likes, setLikes] = useState([]);

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
      setLikes(likesData);
    }
  }, [allSongs, userLikes]);

  if (allSongs.length === 0) {
    return <div>Loading songs...</div>;
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
      {likes.map((like) => (
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

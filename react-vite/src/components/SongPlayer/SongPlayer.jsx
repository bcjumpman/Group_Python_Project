import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useSongContext } from "../../context/SongPlayerContext";
import "./SongPlayer.css";

const SongPlayer = () => {
  const { songs } = useSongContext();
  const playerRef = useRef(null);

  useEffect(() => {
    if (songs.length > 0 && playerRef.current) {
      playerRef.current.audio.current.src = songs[0].song_url;
    }
  }, [songs]);

  const playNextSong = () => {
    if (songs.length > 0 && playerRef.current) {
      const currentSrc = playerRef.current.audio.current.src;
      const currentSongIndex = songs.findIndex(
        (song) => song.song_url === currentSrc
      );
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      const nextSong = songs[nextSongIndex];
      playerRef.current.audio.current.src = nextSong.song_url;
      playerRef.current.audio.current.play();
    }
  };

  return (
    <div className="react-h5-audio-player">
      <AudioPlayer
        ref={playerRef}
        volume={0.1}
        // showSkipControls={true}
        showJumpControls={false}
        onPlayNext={playNextSong}
        src={songs.length > 0 ? songs[0].song_url : ""}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
};

export default SongPlayer;

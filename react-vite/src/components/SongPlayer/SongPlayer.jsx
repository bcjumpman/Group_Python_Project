import AudioPlayer from "react-h5-audio-player";
import { createRef, useEffect } from "react";
import { useSongContext } from "../../context/SongPlayerContext";
import "./SongPlayer.css";

const SongPlayer = () => {
  const { songs, setSongs, prevSongs, setPrevSongs, songTime, setSongTime } =
    useSongContext();
  const player = createRef();

  /* loading audio */
  useEffect(() => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];
      player.current.audio.current.src = randomSong.song_url;
      player.current.audio.current.load();
    }
  }, [songs]);

  const playSong = () => {
    if (player.current.audio.current.paused) {
      player.current.audio.current.play();
    }
  };

  function skipToNextSong() {
    const newSongs = [...prevSongs];
    if (songs && songs[0]) {
      newSongs.unshift(songs[0]);
      setPrevSongs(newSongs);
    }
    const tempSongs = [...songs];
    tempSongs.shift();
    setSongs(tempSongs);

    // if (tempSongs.length) {
    //   console.log("Next song to be played:", tempSongs[0]);
    // }

    if (!tempSongs.length) {
      player.current.audio.current.src = null;
    } else {
      player.current.audio.current.src = tempSongs[0].song_url;
    }
  }

  function skipToPreviousSong() {
    if (songTime > 1) {
      console.log("Starting over");
      player.current.audio.current.currentTime = 0;
      return;
    }
    const newSongs = [...songs];
    if (prevSongs && prevSongs[0]) {
      newSongs.unshift(prevSongs[0]);
      setSongs(newSongs);
    }
    const tempSongs = [...prevSongs];
    tempSongs.shift();
    setPrevSongs(tempSongs);
  }

  return (
    <div className="react-h5-audio-player" onClick={playSong}>
      {" "}
      {/* testing if song does NOT auto play */}
      <AudioPlayer
        ref={player}
        volume={0.1}
        showSkipControls
        showJumpControls
        onListen={(e) => setSongTime(e.target.currentTime)}
        listenInterval={1}
        src={songs && songs[0] ? songs[0].song_url : ""}
        onClickNext={skipToNextSong}
        onClickPrevious={skipToPreviousSong}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
};

export default SongPlayer;

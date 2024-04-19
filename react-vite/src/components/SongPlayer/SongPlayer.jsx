import AudioPlayer from "react-h5-audio-player";
import { createRef, useEffect } from "react";
import { useSongContext } from "../../context/SongPlayerContext";
import "./SongPlayer.css";

const SongPlayer = () => {
  const { songs, setSongs, prevSongs, setPrevSongs, songTime, setSongTime } =
    useSongContext();
  const player = createRef();

  console.log("Current songs:", songs);

  useEffect(() => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];
      player.current.audio.current.src = randomSong.song_url;
      player.current.audio.current.load();
      if (player.current.audio.current.paused) {
        player.current.audio.current.play();
      }
    }
  }, [songs]);

  const playSong = () => {
    if (player.current.audio.current.paused) {
      player.current.audio.current.play();
    }
  };

  const pauseSong = () => {
    if (!player.current.audio.current.paused) {
      player.current.audio.current.pause();
    }
  };

  function skipToNextSong(e) {
    const newSongs = [...prevSongs];
    if (songs && songs[0]) {
      newSongs.unshift(songs[0]);
      setPrevSongs(newSongs);
    }
    const tempSongs = [...songs];
    tempSongs.shift();
    setSongs(tempSongs);
    if (!tempSongs.length) {
      player.current.audio.current.audio = null;
    } else {
      player.current.audio.current.audio.src = tempSongs[0].song_url; // Load the new song
      playSong();
    }

    console.log("skip\nsongs:", tempSongs, "\nprev songs:", newSongs);
  }

  function skipToPreviousSong(e) {
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

    console.log("prev\nsongs:", newSongs, "\nprev songs:", tempSongs);
  }

  return (
    <div className="react-h5-audio-player">
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
        // onPlay={playSong}
        // onPause={pauseSong}
      />
    </div>
  );
};

export default SongPlayer;

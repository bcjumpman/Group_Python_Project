import { createContext, useContext, useEffect, useState } from "react";

export const SongContext = createContext();

export const useSongContext = () => useContext(SongContext);

export default function SongPlayerContext({ children }) {
  const [songs, setSongs] = useState([]);
  const [prevSongs, setPrevSongs] = useState([]);
  const [songTime, setSongTime] = useState(0);

  useEffect(() => {
    if (songs.length) {
      sessionStorage.setItem("songs", JSON.stringify(songs));
    }
  }, [songs]);

  useEffect(() => {
    if (prevSongs.length) {
      sessionStorage.setItem("prev songs", JSON.stringify(prevSongs));
    }
  }, [prevSongs]);

  useEffect(() => {
    if (songTime) {
      sessionStorage.setItem("song time", songTime);
    }
  }, [songTime]);

  useEffect(() => {
    const songs_ss = sessionStorage.getItem("songs");
    const prevSongs_ss = sessionStorage.getItem("prev songs");
    const songTime_ss = sessionStorage.getItem("song time");

    if (songs_ss) setSongs(JSON.parse(songs_ss));
    else
      setSongs([
        {
          song_url:
            "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Brisket+Taco+-+Cumbia+Deli.mp3",
          songPic:
            "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/billie-holiday-lady-in-satin-cover-1958-billboard-1240.webp",
          songName: "Senorita",
          songId: 5,
        },
      ]);

    if (prevSongs_ss) setPrevSongs(JSON.parse(prevSongs_ss));
    else setPrevSongs([]);

    if (songTime_ss) setSongTime(JSON.parse(songTime_ss));

    const element = document.querySelector("audio");
    if (element) {
      element.currentTime = songTime_ss;
    }
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        prevSongs,
        setPrevSongs,
        songTime,
        setSongTime,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

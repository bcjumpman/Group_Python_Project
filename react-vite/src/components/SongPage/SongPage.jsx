import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongsThunk } from "../../redux/song";
import { useEffect } from "react";
import { FeaturedSong, TopFiveSongsByLikes, TopFiveSongsByPlays, TopSongByMostActivity } from "../SongSorts"
import "./SongPage.css"
import PlaylistPage from '../PlaylistPage';


export default function SongPage(){
  const { song } = useParams()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  useEffect(()=>{
    dispatch(getSongsThunk());
  }, [dispatch])

  return (
    <div className='page-container discover'>
      <div className='discover-page-left'>
        <div className='trending-section'>
          <h1>Hi I'm the Song Page</h1>
          <h2>FEATURED ON MUSIC HAZE</h2>
          <FeaturedSong />
        </div>
        <div className="song-info">

        </div>
      </div>
      <span className='v-breaker'></span>
      <PlaylistPage props={{sessionUser}}/>
    </div>
  )
}

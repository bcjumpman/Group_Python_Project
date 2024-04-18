import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../redux/song";
import { useEffect } from "react";
import { AllSongsByIndex, AllSongsByUser } from "../SongSorts"
import "./DiscoverPage.css"


export default function DiscoverPage(){
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getSongsThunk());
  }, [dispatch])

  return (
    <div className='test-container'>
        <AllSongsByIndex />
        <AllSongsByUser />
    </div>

  )
}

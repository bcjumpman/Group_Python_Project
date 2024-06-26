import { useSelector } from 'react-redux'
import './PlaylistPage.css'

export default function PlaylistPage() {
  const user = useSelector(state => state.session.user)

  return (
    <div className='discover-page-right'>
      <h4>Hi, {user?.first_name}</h4>
      <div className='playlist-section'>
        <h5>My Playlists</h5>
        <span className='h-breaker'></span>
        <div className='playlists'>
          <h6>FEATURE</h6>
          <h6>COMING</h6>
          <h6>SOON!!!</h6>
        </div>
      </div>
    </div>
  )
}

import { deleteUserThunk } from '../../redux/profilePage'
import { AllSongsByUser } from '../SongSorts'
import * as sessionActions from '../../redux/session'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ProfileUpdate from './EditProfileModal'
import CreateSong from '../SongPage/SongForm'
import './ProfilePage.css'

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const toInt = parseInt(userId)
    const navigate = useNavigate()
    const { closeModal } = useModal()
    // const sessionObj = useSelector(state => state.session.user)
    // const songObj = useSelector(state => state.song)
    // const commentObj = useSelector(state => state.comment)

    let user = useSelector(state => state.session.user ? state.session.user : null)

    // const song = Object.values(songObj).filter(song => song.userId === parseInt(userId))
    // const comments = Object.values(commentObj).filter(comment => comment.userId === parseInt(userId))

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.thunkLogout());
        navigate('/')
    }

    const handleDeleteProfile = toInt => {
        const deletedUser = dispatch(deleteUserThunk(toInt));
        if (deletedUser) {
            navigate('/')
            closeModal()
        }
    }

    return (
        <>
            <section className='profile-contain'>
                <div id='prof-info'>
                    <div id='prof-stuff'>
                        <p className='prof-piece'>First Name:
                            <p className='info'>{user.first_name}</p>
                        </p>
                        <p className='prof-piece'>Last Name:
                            <p className='info'>{user.last_name}</p>
                        </p>
                        <p className='prof-piece'>Email:
                            <p className='info'>{user.email}</p>
                        </p>
                        <p className='prof-piece'>Username:
                            <p className='info'>{user.username}</p>
                        </p>
                    </div>
                    <div id='artist-stuff'>
                        {user.is_artist ?
                            <>
                                <p className='artist-piece'>Artist Name:
                                    <p className='artist-info'>{user.artist_name}</p>
                                </p>
                                <p className='artist-piece'>Country:
                                    <p className='artist-info'>{user.artist_country}</p>
                                </p>
                                <p className='artist-piece'>Biography:
                                    <p className='artist-info'>{user.artist_bio}</p>
                                </p>
                            </>
                            : null}
                    </div>
                </div>
                <OpenModalMenuItem
                    itemText='Edit Profile'
                    className='edit-button'
                    modalComponent={(
                        <ProfileUpdate toInt={toInt} />
                    )} />
            </section>
            <section className='songs-contain'>
                <div id='artist-songs'>
                    {user.is_artist ?
                        <>
                            <AllSongsByUser />
                            <OpenModalMenuItem
                                itemText='New Song'
                                className='create-button'
                                modalComponent={<CreateSong />}
                            />
                        </> : null}
                </div>
            </section>
            <section className='button-contain'>
                <div>
                    <div id='logout-but'>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <div id='delete-user-but'>
                        <OpenModalMenuItem
                            itemText='Delete User'
                            className='delete-button'
                            modalComponent={(
                                <div id='confirm-delete'>
                                    <h2>Confirm Delete</h2>
                                    <span>Are you sure you want to remove this user?</span>
                                    <button id='delete-complete' type='button' onClick={() => handleDeleteProfile(user.id)}>Yes (Delete User)</button>
                                    <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep User)</button>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserPage

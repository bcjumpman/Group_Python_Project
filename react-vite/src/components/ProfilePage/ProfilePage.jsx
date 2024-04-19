import { getUserThunk } from '../../redux/profilePage'
// import { getUserSongsThunk, createSongThunk, editSongThunk, deleteSongThunk } from '../../redux/song'
// import { loadUserCommentsThunk, editCommentThunk, deleteCommentThunk } from '../../redux/comment'
import { deleteSongThunk } from '../../redux/song'
import { deleteCommentThunk } from '../../redux/comment'
import { AllSongsByUser } from '../SongSorts'
import * as sessionActions from '../../redux/session'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ProfileUpdate from './EditProfileModal'
import './ProfilePage.css'

const UserPage = () => {
    const dispatch = useDispatch()
    // const { userId } = useParams()
    const navigate = useNavigate()
    const { closeModal } = useModal()
    // const sessionObj = useSelector(state => state.session.user)
    // const songObj = useSelector(state => state.song)
    // const commentObj = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getUserThunk())
    }, [dispatch])

    const user = useSelector(state => state.session.user ? state.session.user : null)

    const handleUpdateSong = user => {
        navigate(`/profile/${user.id}/edit`)
    }

    const handleUpdateComment = user => {
        navigate(`/profile/${user.id}/edit`)
    }

    // const songs = Object.values(songObj).filter(song => song.userId === parseInt(userId))
    // const comments = Object.values(commentObj).filter(comment => comment.userId === parseInt(userId))

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.thunkLogout());
        navigate('/')
    }

    const handleDeleteProfile = user => {
        dispatch(sessionActions.removeUser(user.id))
        closeModal()
    }

    const handleDeleteSong = user => {
        dispatch(deleteSongThunk(user.id))
        closeModal()
    }

    const handleDeleteComment = user => {
        dispatch(deleteCommentThunk(user.id))
        closeModal()
    }

    return (
        <>
            <section className='profile-contain'>
                <div id='prof-info'>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    {user.is_artist ?
                        <>
                            <p>Artist Name: {user.artist_name}</p>
                            <p>Country: {user.artist_country}</p>
                            <p>Biography: {user.artist_bio}</p>
                        </>
                        : null}
                    <OpenModalMenuItem
                        itemText='Edit Profile'
                        className='edit-button'
                        modalComponent={(
                            <ProfileUpdate />
                        )} />
                    {/* <button className='update-btn' type='button' onClick={() => handleUpdateProfile(user.id)}>Edit Profile</button> */}
                </div>
            </section>
            <section className='songs-contain'>
                <div id='artist-songs'>
                    {user.is_artist ?
                        <>
                            <AllSongsByUser />
                            <div className='edit-or-delete'>
                                <button className='update-btn' type='button' onClick={() => handleUpdateSong(user.id)}>Update Song</button>
                                <OpenModalMenuItem
                                    itemText='Delete'
                                    className='delete-button'
                                    modalComponent={(
                                        <div id='confirm-delete'>
                                            <h2>Confirm Delete</h2>
                                            <span>Are you sure you want to remove this song?</span>
                                            <button id='delete-complete' type='button' onClick={() => handleDeleteSong(user.id)}>Yes (Delete Song)</button>
                                            <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Song)</button>
                                        </div>
                                    )}
                                />
                            </div>
                        </> : null}
                </div>
            </section>
            <section className='comments-contain'>
                <div id='user-comments'>
                    {/* {comments.map(comment => { */}
                    {/* // parts of code from single song page #Comments */}
                    <div className='edit-or-delete'>
                        <button className='update-btn' type='button' onClick={() => handleUpdateComment(user.id)}>Edit Comment</button>
                        <OpenModalMenuItem
                            itemText='Delete'
                            className='delete-button'
                            modalComponent={(
                                <div id='confirm-delete'>
                                    <h2>Confirm Delete</h2>
                                    <span>Are you sure you want to remove this comment?</span>
                                    <button id='delete-complete' type='button' onClick={() => handleDeleteComment(user.id)}>Yes (Delete Comment)</button>
                                    <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Comment)</button>
                                </div>
                            )}
                        />
                    </div>
                    {/* })} */}
                </div>
            </section>
            <section className='button-contain'>
                <div>
                    <div id='logout-but'>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <div id='delete-user-but'>
                        <OpenModalMenuItem
                            itemText='Delete'
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

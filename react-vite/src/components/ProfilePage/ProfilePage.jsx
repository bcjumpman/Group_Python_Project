import { getUserThunk } from '../../redux/profilePage'
// import { getUserSongsThunk, createSongThunk, editSongThunk, deleteSongThunk } from '../../redux/song'
// import { loadUserCommentsThunk, editCommentThunk, deleteCommentThunk } from '../../redux/comment'
import { deleteSongThunk } from '../../redux/song'
import { deleteCommentThunk } from '../../redux/comment'
import { AllSongsByUser } from '../SongSorts'
import * as sessionActions from '../../redux/session'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './ProfilePage.css'

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const navigate = useNavigate()
    const { closeModal } = useModal()
    // const sessionObj = useSelector(state => state.session.user)
    // const songObj = useSelector(state => state.song)
    // const commentObj = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getUserThunk(userId))
    }, [dispatch, userId])

    const handleUpdateProfile = userId => {
        navigate(`/profile/${userId}/edit`)
    }

    const handleUpdateSong = userId => {
        navigate(`/profile/${userId}/edit`)
    }

    const handleUpdateComment = userId => {
        navigate(`/profile/${userId}/edit`)
    }

    // const songs = Object.values(songObj).filter(song => song.userId === parseInt(userId))
    // const comments = Object.values(commentObj).filter(comment => comment.userId === parseInt(userId))

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    const handleDeleteProfile = userId => {
        dispatch(sessionActions.removeUser(userId))
        closeModal()
    }

    const handleDeleteSong = userId => {
        dispatch(deleteSongThunk(userId))
        closeModal()
    }

    const handleDeleteComment = userId => {
        dispatch(deleteCommentThunk(userId))
        closeModal()
    }

    return (
        <section>
            <div id='prof-info'>
                <li>{userId.first_name}</li>
                <li>{userId.last_name}</li>
                <li>{userId.email}</li>
                <li>{userId.username}</li>
                <li>{userId.artist_name}</li>
                <li>{userId.artist_country}</li>
                <li>{userId.artist_bio}</li>
                <button className='update-btn' type='button' onClick={() => handleUpdateProfile(userId)}>Edit Profile</button>
            </div>
            <div id='artist-songs'>
                {/* {songs.map(song => { */}
                {/* // code from discover page #Songs */}
                <AllSongsByUser />
                <div className='edit-or-delete'>
                    <button className='update-btn' type='button' onClick={() => handleUpdateSong(userId)}>Update Song</button>
                    <OpenModalMenuItem
                        itemText='Delete'
                        className='delete-button'
                        modalComponent={(
                            <div id='confirm-delete'>
                                <h2>Confirm Delete</h2>
                                <span>Are you sure you want to remove this song?</span>
                                <button id='delete-complete' type='button' onClick={() => handleDeleteSong(userId)}>Yes (Delete Song)</button>
                                <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Song)</button>
                            </div>
                        )}
                    />
                </div>
                {/* })} */}
            </div>
            <div id='user-comments'>
                {/* {comments.map(comment => { */}
                {/* // parts of code from single song page #Comments */}
                <div className='edit-or-delete'>
                    <button className='update-btn' type='button' onClick={() => handleUpdateComment(userId)}>Edit Comment</button>
                    <OpenModalMenuItem
                        itemText='Delete'
                        className='delete-button'
                        modalComponent={(
                            <div id='confirm-delete'>
                                <h2>Confirm Delete</h2>
                                <span>Are you sure you want to remove this comment?</span>
                                <button id='delete-complete' type='button' onClick={() => handleDeleteComment(userId)}>Yes (Delete Comment)</button>
                                <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Comment)</button>
                            </div>
                        )}
                    />
                </div>
                {/* })} */}
            </div>
            <div id='button-contain'>
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
                                <button id='delete-complete' type='button' onClick={() => handleDeleteProfile(userId)}>Yes (Delete User)</button>
                                <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep User)</button>
                            </div>
                        )}
                    />
                </div>
            </div>
        </section>
    )
}

export default UserPage

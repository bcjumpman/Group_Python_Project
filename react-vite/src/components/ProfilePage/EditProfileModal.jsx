import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { editUserThunk } from "../../redux/profilePage"
import { useModal } from "../../context/Modal"
import './EditProfileModal.css'

const ProfileUpdate = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user ? state.session.user : null)
    const currUser = useSelector(state => state.user[userId])

    const [firstName, setFirstName] = useState(currUser?.firstName || "")
    const [lastName, setLastName] = useState(currUser?.lastName || "")
    const [email, setEmail] = useState(currUser?.email || "")
    const [username, setUsername] = useState(currUser?.username || "")
    const [artistName, setArtistName] = useState(currUser?.artistName || "")
    const [artistCountry, setArtistCountry] = useState(currUser?.artistCountry || "")
    const [artistBio, setArtistBio] = useState(currUser?.artistBio || "")
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}
        setSubmit(true)

        if (!firstName) {
            err.firstName = "First name is required"
            setErrors(err)
            return err
        }
        if (!lastName) {
            err.lastName = "Last name is required"
            setErrors(err)
            return err
        }
        if (!email) {
            err.email = "Email is required"
            setErrors(err)
            return err
        }
        if (!username) {
            err.username = "Username is required"
            setErrors(err)
            return err
        }
        if (user.is_artist && !artistName) {
            err.artistName = "Name of artist is required"
            setErrors(err)
            return err
        }

        let userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
        }
        if (user.is_artist) {
            userData = {
                ...userData,
                artist_name: artistName,
                artist_country: artistCountry,
                artist_bio: artistBio
            }
        }

        const updateUser = await dispatch(editUserThunk(userId, userData))
        if (updateUser && updateUser.errors) {
            setErrors({ ...updateUser.errors, ...errors })
        } else {
            closeModal()
        }
    }

    useEffect(() => {
        const validErrs = {}
        if (submit && !firstName) validErrs.firstName = "First name is required"
        if (submit && !lastName) validErrs.lastName = "Last name is required"
        if (submit && !email) validErrs.email = "Email is required"
        if (submit && !username) validErrs.username = "Username is required"
        if (submit && !artistName) validErrs.artistName = "Name of artist is required"
        setErrors(validErrs)
    }, [firstName, lastName, email, username, artistName, submit])

    return (
        <div id="form-modal-contain">
            <form onSubmit={handleSubmit} id="form">
                <h2>Update Profile Info</h2>
                <div>
                    <label className="user-label">
                        First Name
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
                    <label className="user-label">
                        Last Name
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
                    <label className="user-label">
                        Email
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {errors.email && <p className="err-msg">{errors.email}</p>}
                    <label className="user-label">
                        Username
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {errors.username && <p className="err-msg">{errors.username}</p>}
                    {user.is_artist && (
                        <>
                            <label className="user-label">
                                Artist Name
                                <input
                                    type="text"
                                    placeholder="Artist Name"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                />
                            </label>
                            {errors.artistName && <p className="err-msg">{errors.artistName}</p>}
                            <label className="user-label">
                                Country
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={artistCountry}
                                    onChange={(e) => setArtistCountry(e.target.value)}
                                />
                            </label>
                            <label className="user-label">
                                Biography
                                <input
                                    type="text"
                                    placeholder="Bio"
                                    value={artistBio}
                                    onChange={(e) => setArtistBio(e.target.value)}
                                />
                            </label>
                        </>)}
                </div>
                <button id="submit" type="submit">Update User</button>
                <button id="cancel" type="button" onClick={closeModal}>Cancel Update</button>
            </form >
        </div >
    )
}

export default ProfileUpdate

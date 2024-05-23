import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useParams, } from "react-router-dom"
import { editUserThunk } from "../../redux/profilePage"
import { useModal } from "../../context/Modal"
import './EditProfileModal.css'

const ProfileUpdate = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user ? state.session.user : null)
    const currUser = useSelector(state => state.user.userProfile)

    const [firstName, setFirstName] = useState(currUser?.first_name || "")
    const [lastName, setLastName] = useState(currUser?.last_name || "")
    const [email, setEmail] = useState(currUser?.email || "")
    const [username, setUsername] = useState(currUser?.username || "")
    const [isArtist, setIsArtist] = useState(currUser?.is_artist || false)
    const [artistName, setArtistName] = useState(currUser?.artist_name || "")
    const [artistCountry, setArtistCountry] = useState(currUser?.artist_country || "")
    const [artistBio, setArtistBio] = useState(currUser?.artist_bio || "")
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
            is_artist: isArtist
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
        if (submit && !isArtist) validErrs.isArtist = "Please select true or false"
        if (submit && !artistName) validErrs.artistName = "Name of artist is required"
        setErrors(validErrs)
    }, [firstName, lastName, email, username, isArtist, artistName, submit])

    return (
        <div id="edit-profile">
            <form onSubmit={handleSubmit} id="form">
                <h2>Update Profile Info</h2>
                <div className="form-inputs">
                    <label className="user-label">
                        <div className="label-n-err">
                            <span>First Name</span>
                            {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
                        </div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="user-label">
                    <div className="label-n-err">
                        <span>Last Name</span>
                        {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
                    </div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="user-label">
                    <div className="label-n-err">
                        <span>Email</span>
                        {errors.email && <p className="err-msg">{errors.email}</p>}
                    </div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="user-label">
                    <div className="label-n-err">
                        <span>Username</span>
                        {errors.username && <p className="err-msg">{errors.username}</p>}
                    </div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <div className="pub-or-priv">
                        <span>Artist: </span>
                        <label>
                            True
                            <input
                                type="radio"
                                value={true}
                                checked={isArtist === true}
                                onChange={() => setIsArtist(true)}
                            />
                        </label>
                        <label>
                            False
                            <input
                                type="radio"
                                value={false}
                                checked={isArtist === false}
                                onChange={() => setIsArtist(false)}
                            />
                        </label>
                    {errors.isArtist && <p className="err-msg">{errors.isArtist}</p>}
                    </div>
                    {user.is_artist && (
                        <>
                            <label className="user-label">
                            <div className="label-n-err">
                                <span>Artist Name</span>
                                {errors.artistName && <p className="err-msg">{errors.artistName}</p>}
                            </div>
                                <input
                                    type="text"
                                    placeholder="Artist Name"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                />
                            </label>
                            <label className="user-label">
                            <div className="label-n-err">
                                <span>Country</span>
                            </div>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={artistCountry}
                                    onChange={(e) => setArtistCountry(e.target.value)}
                                />
                            </label>
                            <label className="user-label">
                                <div className="label-n-err">
                                    <span>Biography</span>
                                </div>
                                <textarea
                                    type="text"
                                    placeholder="Bio"
                                    value={artistBio}
                                    onChange={(e) => setArtistBio(e.target.value)}
                                />
                            </label>
                        </>)}
                </div>
                <div className="form-buttons">
                    <button id="submit" type="submit">Update User</button>
                    <button id="cancel" type="button" onClick={closeModal}>Cancel Update</button>
                </div>
            </form >
        </div >
    )
}

export default ProfileUpdate

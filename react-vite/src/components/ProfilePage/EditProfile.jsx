import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUser } from "../../redux/profilePage"
import './SpotForm.css'

const ProfileUpdate = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currUser = useSelector(state => state.user[userId])

    const [firstName, setFirstName] = useState(currUser.first_name || "")
    const [lastName, setLastName] = useState(currUser.last_name || "")
    const [email, setEmail] = useState(currUser.email || "")
    const [username, setUsername] = useState(currUser.username || "")
    const [artistName, setArtistName] = useState(currUser.artist_name || "")
    const [artistCountry, setArtistCountry] = useState(currUser.artist_country || "")
    const [artistBio, setArtistBio] = useState(currUser.artist_bio || "")
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}
        setSubmit(true)

        if (!firstName) {
            err.first_name = "First name is required"
            setErrors(err)
            return err
        }
        if (!lastName) {
            err.last_name = "Last name is required"
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
        if (!artistName) {
            err.artist_name = "Name of artist is required"
            setErrors(err)
            return err
        }
        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            username,
            artist_name: artistName,
        }

        const updateUser = await dispatch(editUser(userData, userId))
        if (updateUser.errors) {
            setErrors({ ...updateUser.errors, ...errors })
        } else {
            dispatch(editUser(updateUser))
            navigate(`/profile/${updateUser.id}`)
        }
    }

    const handleCancel = () => {
        navigate(`/profile/${userId}`)
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
        <div id="">
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
                </div>
            </form>
            <button id="submit" type="submit">Update User</button>
            <button id="cancel" type="button" onClick={handleCancel}>Cancel Update</button>
        </div>
    )
}

export default ProfileUpdate

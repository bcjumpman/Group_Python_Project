import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { editSongThunk } from "../../redux/song"
import { useModal } from "../../context/Modal"
import './EditSong.css'

const SongUpdate = () => {
    const { userId, songId } = useParams()
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    // const user = useSelector(state => state.session.user ? state.session.user : null)
    const currUser = useSelector(state => state.user[userId])

    const [name, setName] = useState(currUser?.name || "")
    const [songUrl, setSongUrl] = useState(currUser?.song_url || "")
    const [coverArt, setCoverArt] = useState(currUser?.cover_art || "")
    const [genre, setGenre] = useState(currUser?.genre || "Select genre")
    const [isPrivate, setIsPrivate] = useState(currUser?.is_private || false)
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}
        setSubmit(true)

        if (!name) {
            err.name = "Song title is required"
            setErrors(err)
            return err
        }
        if (!songUrl) {
            err.songUrl = "URL is required"
            setErrors(err)
            return err
        }
        if (!coverArt) {
            err.coverArt = "Cover art is required"
            setErrors(err)
            return err
        }
        if (!genre) {
            err.genre = "Genre is required"
            setErrors(err)
            return err
        }
        if (!isPrivate) {
            err.isPrivate = "Please indicate whether you want to make your song private or not"
            setErrors(err)
            return err
        }

        let songData = {
            name,
            song_url: songUrl,
            cover_art: coverArt,
            genre,
            is_private: isPrivate
        }

        const updateSong = await dispatch(editSongThunk(songId, songData))
        if (updateSong && updateSong.errors) {
            setErrors({ ...updateSong.errors })
        } else {
            dispatch(editSongThunk(updateSong))
            closeModal()
        }
    }

    useEffect(() => {
        const validErrs = {}
        if (submit && !name) validErrs.name = "Song title is required"
        if (submit && !songUrl) validErrs.songUrl = "URL is required"
        if (submit && !coverArt) validErrs.email = "Cover art is required"
        if (submit && !genre) validErrs.username = "Genre is required"
        if (submit && !isPrivate) validErrs.artistName = "Please indicate whether you want to make your song private or not"
        setErrors(validErrs)
    }, [name, songUrl, coverArt, genre, isPrivate, submit])

    const genres = ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae", "other"]


    return (
        <div id="form-modal-contain">
            <form onSubmit={handleSubmit} id="form">
                <h2>Update Song Info</h2>
                <div>
                    <label className="user-label">
                        Song Title
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p className="err-msg">{errors.name}</p>}
                    <label className="user-label">
                        Song URL
                        <input
                            type="file"
                            value={songUrl}
                            onChange={(e) => setSongUrl(e.target.value)}
                        />
                    </label>
                    {errors.songUrl && <p className="err-msg">{errors.songUrl}</p>}
                    <label className="user-label">
                        Cover Art
                        <input
                            type="file"
                            value={coverArt}
                            onChange={(e) => setCoverArt(e.target.value)}
                        />
                    </label>
                    {errors.coverArt && <p className="err-msg">{errors.coverArt}</p>}
                    <label className="spot-label">
                        Genre
                        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                            <option value="">Select Genre</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </label>
                    {errors.genre && <p className="err-msg">{errors.genre}</p>}
                    <div className="pub-or-priv">
                        <label>
                            Private
                            <input
                                type="radio"
                                value={true}
                                checked={isPrivate === true}
                                onChange={() => setIsPrivate(true)}
                            />
                        </label>
                        <label>
                            Public
                            <input
                                type="radio"
                                value={false}
                                checked={isPrivate === false}
                                onChange={() => setIsPrivate(false)}
                            />
                        </label>
                    </div>
                </div>
                <button id="submit" type="submit">Update Song</button>
                <button id="cancel" type="button" onClick={closeModal}>Cancel Update</button>
            </form>
        </div>
    )
}

export default SongUpdate

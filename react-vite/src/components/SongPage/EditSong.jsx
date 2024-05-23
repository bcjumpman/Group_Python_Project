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

    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}

        if (!name) err.name = "Song title is required"
        if (!songUrl) err.songUrl = "URL is required"
        if (!coverArt) err.coverArt = "Cover art is required"
        if (!genre) err.genre = "Genre is required"
        if (!isPrivate) err.isPrivate = "Please select private or public"
        if (Object.keys(err).length > 0) return setErrors(err);

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

    const genres = ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae", "other"]

    return (
        <div id="song-edit">
            <form onSubmit={handleSubmit} id="full-form">
                <h2>Update Song Info</h2>
                <div>
                    <label className="spot-label">
                    <div className="label-n-err">
                        <span>Title</span>
                        {errors.name && <p className="err">{errors.name}</p>}
                    </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="spot-label">
                    <div className="label-n-err">
                        <span>Upload Song</span>
                        {errors.songUrl && <p className="err">{errors.songUrl}</p>}
                    </div>
                        <input
                            type="file"
                            value={songUrl}
                            onChange={(e) => setSongUrl(e.target.value)}
                        />
                    </label>
                    <label className="spot-label">
                    <div className="label-n-err">
                        <span>Select Cover Art</span>
                        {errors.coverArt && <p className="err">{errors.coverArt}</p>}
                    </div>
                        <input
                            type="file"
                            value={coverArt}
                            onChange={(e) => setCoverArt(e.target.value)}
                        />
                    </label>
                    <label className="spot-label">
                    <div className="label-n-err">
                        <span>Genre</span>
                        {errors.genre && <p className="err">{errors.genre}</p>}
                    </div>
                        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                            <option value="">Select Genre</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </label>
                    <div className="pub-or-priv">
                        <span>Select visibility:</span>
                        <label>
                            <span>Private</span>
                            <input
                                type="radio"
                                value={true}
                                checked={isPrivate === true}
                                onChange={() => setIsPrivate(true)}
                            />
                        </label>
                        <label>
                            <span>Public</span>
                            <input
                                type="radio"
                                value={false}
                                checked={isPrivate === false}
                                onChange={() => setIsPrivate(false)}
                            />
                        </label>
                    </div>
                </div>
                <div id="button-contain">
                    <button id="submit" type="submit">Update Song</button>
                    <button id="cancel" type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default SongUpdate

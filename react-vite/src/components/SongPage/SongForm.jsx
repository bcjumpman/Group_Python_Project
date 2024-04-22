import { useState, useEffect } from "react";
import { createSongThunk } from "../../redux/song";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import './SongForm.css'

const CreateSong = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [genre, setGenre] = useState("");
    const [isPrivate, setIsPrivate] = useState(null);
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)
    const { closeModal } = useModal();


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
        if (isPrivate === null) {
            err.isPrivate = "Please indicate whether you want to make your song private or not"
            setErrors(err)
            return err
        }
        if (Object.keys(err).length > 0) return err;

        const formData = new FormData()
        formData.append('song_url', songUrl);
        formData.append('name', name),
        formData.append('duration', 88)
        formData.append('cover_art', coverArt); // Corrected typo here
        formData.append('genre', genre);
        formData.append('is_private', isPrivate);

        const newSong = await dispatch(createSongThunk(formData))

        if (newSong && newSong.id) {
            closeModal()
            navigate(`/songs/${newSong.id}`)
        } else {
            setErrors({ ...errors })
        }
        // ...newSong.errors,
    }
    useEffect(() => {
        const validErrs = {}
        if (submit && !name) validErrs.name = "Country is required"
        if (submit && !songUrl) validErrs.songUrl = "URL is required"
        if (submit && !coverArt) validErrs.coverArt = "Cover art is required"
        if (submit && !genre) validErrs.genre = "Genre is required"
        if (submit && !isPrivate) validErrs.isPrivate = "Please indicated whether you want to make your song private or not"
        setErrors(validErrs)
    }, [name, songUrl, coverArt, genre, isPrivate, submit])

    const genres = ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae", "other"]

    return (
        <div id="song-new">
            <form onSubmit={handleSubmit} id='full-form' encType="multipart/form-data">
                <h2>Create a New Song</h2>
                <div>
                    <label className="spot-label">
                        Title
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p className="err-msg">{errors.name}</p>}
                    <label className="upload-label">
                        Link to Song
                        <input
                            type="file"
                            label='Upload song'
                            // buttonAfter={uploadFileButton}
                            accept='audio/*'

                            onChange={(e) => setSongUrl(e.target.files[0])}
                        />
                    </label>
                    {errors.songUrl && <p className="err-msg">{errors.songUrl}</p>}
                    <label className="upload-label">
                        Link to Cover Art
                        <input
                            type="file"
                            label='Upload coverart'
                            accept='image/*'
                            // buttonAfter={uploadFileButton}

                            onChange={(e) => setCoverArt(e.target.files[0])}
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
                                value="true"
                                checked={isPrivate === "true"}
                                onChange={() => setIsPrivate("true")}
                            />
                        </label>
                        <label>
                            Public
                            <input
                                type="radio"
                                value="false"
                                checked={isPrivate === "false"}
                                onChange={() => setIsPrivate("false")}
                            />
                        </label>
                    </div>
                    {errors.isPrivate && <p className="err-msg">{errors.isPrivate}</p>}
                </div>
                <div id="button-contain">
                    <button id="submit-button" type="submit">Create Song</button>
                    <button id="cancel-button" type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSong;

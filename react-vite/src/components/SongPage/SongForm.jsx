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
    const { closeModal } = useModal();


    const handleSubmit = async e => {
        e.preventDefault()
        const err = {}

        if (!name) err.name = "Song title is required"
        if (!songUrl) err.songUrl = "URL is required"
        if (!coverArt) err.coverArt = "Cover art is required"
        if (!genre) err.genre = "Genre is required"
        if (isPrivate === null) err.isPrivate = "Please indicate whether you want to make your song private or not"
        if (Object.keys(err).length > 0) return setErrors(err);

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
    }

    const genres = ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae", "other"]

    return (
        <div id="song-new">
            <form onSubmit={handleSubmit} id='full-form' encType="multipart/form-data">
                <h2>Create a New Song</h2>
                <div className="input-fields">
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
                    <label className="upload-label">
                    <div className="label-n-err">
                        <span>Upload Song</span>
                        {errors.songUrl && <p className="err">{errors.songUrl}</p>}
                    </div>
                        <input
                            type="file"
                            label='Upload song'
                            // buttonAfter={uploadFileButton}
                            accept='audio/*'

                            onChange={(e) => setSongUrl(e.target.files[0])}
                        />
                    </label>
                    <label className="upload-label">
                    <div className="label-n-err">
                        <span>Select Cover Art</span>
                        {errors.coverArt && <p className="err">{errors.coverArt}</p>}
                    </div>
                        <input
                            type="file"
                            label='Upload coverart'
                            accept='image/*'
                            // buttonAfter={uploadFileButton}
                            onChange={(e) => setCoverArt(e.target.files[0])}
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
                    <div className="song-visibility">
                        <div className="pub-or-priv">
                        <span>Select visibility:</span>
                            <label>
                                <span>Private</span>
                                <input
                                    type="radio"
                                    value={true}
                                    checked={isPrivate === "true"}
                                    onChange={() => setIsPrivate("true")}
                                />
                            </label>
                            <label>
                                <span>Public</span>
                                <input
                                    type="radio"
                                    value={false}
                                    checked={isPrivate === "false"}
                                    onChange={() => setIsPrivate("false")}
                                />
                            </label>
                        </div>
                        {errors.isPrivate && <p className="err">{errors.isPrivate}</p>}
                    </div>
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

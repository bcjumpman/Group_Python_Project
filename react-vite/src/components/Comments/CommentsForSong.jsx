import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSongThunk } from "../../redux/song"
import { createCommentThunk, deleteCommentThunk, editCommentThunk } from "../../redux/comment"
import { useState } from "react"

export default function CommentsForSong(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState()
  const [currComment, setCurrComment] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const user_id = useSelector(state => state.session.user.id)
  const songComments = useSelector(state => state.song.singleSong.song.comments)
  let data = {}

  if(!songComments) return dispatch(getSongThunk(id))

  const handleSubmit = async(e) => {
    e.preventDefault()

    data = {
      song_id: id,
      user_id,
      body: newComment
    }

    dispatch(createCommentThunk(data))
    dispatch(getSongThunk(id))
  }

  const handleEditSubmit = async(e) => {
    e.preventDefault()

    data = {
      id: currComment.id,
      song_id: id,
      user_id,
      body: newComment
    }

    dispatch(editCommentThunk(data))
    setNewComment('')
    setIsEdit(!isEdit)
    dispatch(getSongThunk(id))
  }

  const handleEdit = async(e, comment) => {
    e.preventDefault()

    if(isEdit){
      data = comment
      setCurrComment('')
      setNewComment('')
      setIsEdit(!isEdit)
    } else if(!isEdit) {
      setNewComment(comment.body)
      setCurrComment(comment)
      setIsEdit(!isEdit)
    }
  }

  const handleDelete = async(e, comment) => {
    e.preventDefault()

    setIsEdit(false)
    setNewComment('')
    dispatch(deleteCommentThunk(comment.id))
    dispatch(getSongThunk(id))

  }

  return (
    <div>
      <form onSubmit={isEdit? handleEditSubmit : handleSubmit} action="">
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} name="new-comment" id="new-comment" cols="100" rows="4" placeholder="Enter new comment"></textarea>

        {isEdit?
        <div>
          <button>Update Comment</button>
          <button onClick={(e)=> handleEdit(e)}>Cancel</button>
          </div> : <button>Leave Comment</button>}
      </form>
      <ul className="comments-section">
        {songComments.length? songComments.map((comment)=>
          <li key={comment.id}>{comment.body}
            {comment.user_id === user_id ?
            <div>
              <button onClick={(e)=> handleEdit(e, comment)}>edit</button>
              <button onClick={(e)=> handleDelete(e, comment)}>delete</button>
            </div> : null }
            {console.log(comment.user_id, user_id)}
          </li>): <h4>No Comments</h4>}
      </ul>
    </div>
  )
}

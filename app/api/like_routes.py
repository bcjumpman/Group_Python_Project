from flask import Blueprint, jsonify, request
from app.models import db, Like


like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def getAllLikes():
  likes = Like.query.all()
  return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/', methods=["POST"])
def addNewLike():
  data = request.get_json()

  like = Like(
    user_id = data['user_id'],
    song_id = data['song_id']
  )

  db.session.add(like)
  db.session.commit()

  return {"new_like": like.to_dict()}

@like_routes.route('<int:id>', methods=["DELETE"])
def deleteLikeById(id):
  #CHANGE to find like on backend using song_id and user_id
  like = Like.query.get(id)
  db.session.delete(like)
  db.session.commit()
  return jsonify(f"Like was removed from song {like.song_id}")

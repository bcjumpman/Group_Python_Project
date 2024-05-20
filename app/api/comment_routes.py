from flask import Blueprint, jsonify, request
from app.models import db, Comment


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def getAllComments():
  comments = Comment.query.all()
  return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=["POST"])
def createComment():
  data = request.get_json()

  comment = Comment(
    body = data['body'],
    song_id = data['song_id'],
    user_id = data['user_id']
  )

  db.session.add(comment)
  db.session.commit()

  return comment.to_dict()

@comment_routes.route('<int:id>', methods=["PUT"])
def editCommentById(id):
  data = request.get_json()
  comment = Comment.query.get(id)
  if not comment:
    return jsonify({"message": f'No comment was located with the id of {id}'})

  comment.body = data['body']

  db.session.commit()

  return comment.to_dict()

@comment_routes.route('<int:id>', methods=["DELETE"])
def deleteCommentById(id):
  comment = Comment.query.get(id)
  if not comment:
    return jsonify({"message": f'No comment was located with the id of {id}'})


  db.session.delete(comment)
  db.session.commit()

  return jsonify(f"The comment was deleted successfully")

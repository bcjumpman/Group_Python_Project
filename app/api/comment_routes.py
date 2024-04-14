from flask import Blueprint, jsonify
from app.models import Comment


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def getAllComments():
  comments = Comment.query.all()
  return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes('<int:id>')
def getCommentById(id):
  comment = Comment.query.all()
  return {'comment': comment}

@comment_routes('<int:id>', methods=["POST"])
def getCommentById(id):
  comment = Comment.query.all()
  return {'comment': comment}

@comment_routes('<int:id>/delete')
def deleteCommentById(id):
  comment = Comment.query.all()
  return {'comment': comment}

from flask import Blueprint, jsonify
from app.models import Like


like_routes = Blueprint('likes', __name__)

# @like_routes.route('/')
# def getAllLikes():
#   likes = Like.query.all()
#   return {'likes': [like.to_dict() for like in likes]}

# @like_routes('<int:id>')
# def getLikeById(id):
#   like = Like.query.all()
#   return like.to_dict()

# @like_routes('<int:id>', methods=["POST"])
# def getLikeById(id):
#   like = Like.query.all()
#   return like.to_dict()

# @like_routes('<int:id>/delete')
# def deleteLikeById(id):
#   like = Like.query.all()
#   return like.to_dict()

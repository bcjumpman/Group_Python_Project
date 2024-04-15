from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if not user:
        return {"errors": "User not found"}, 404

    return jsonify(user.to_dict())


# # user_songs
# @user_routes.route('/<int:id>/songs')
# def song(id):
#     user = User.query.get(id)

#     if user:
#         songs = user.songs.all()

#     return songs


# create
# @user_routes.route('/', methods=['POST'])
# def create_user():
#     # Get form data
#     data = request.get_json()

#     user = dict()

#     # update song with form data
#     user['first_name'] = data['first_name']
#     user['last_name'] = data['last_name']
#     user['artist_name'] = data['artist_name']
#     user['artist_country'] = data['artist_country']
#     user['artist_bio'] = data['artist_bio']

#     return jsonify({"user": user})


# update
@user_routes.route('/<int:id>', methods=['PUT'])
def update_user(id):
    return


# delete
@user_routes.route('/<int:id>', methods=['DELETE'])
def remove_user(id):
    return

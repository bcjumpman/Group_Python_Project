from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

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
@user_routes.route('/', methods=['POST'])
def create_user():
    # Get form data
    data = request.get_json()

    # user = dict()

    # update song with form data
    user = User(
        first_name = data.get('first_name'),
        last_name = data.get('last_name'),
        artist_name = data.get('artist_name'),
        artist_country = data.get('artist_country'),
        artist_bio = data.get('artist_bio')
    )

    db.session.add()
    db.session.commit()

    # return jsonify({"user": user})
    return jsonify(user.to_dict()), 201


# update
@user_routes.route('/<int:id>', methods=['PUT'])
def update_user(id):
        # Get form data
    data = request.get_json()

    # Query for the user
    user = User.query.get(id)

    # Check if the user exists
    if not user:
        return {"errors": "User not found"}, 404

    # Update user attributes
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.artist_name = data.get('artist_name', user.artist_name)
    user.artist_country = data.get('artist_country', user.artist_country)
    user.artist_bio = data.get('artist_bio', user.artist_bio)

    # Commit changes to the database
    db.session.commit()

    return jsonify(user.to_dict())


# delete
@user_routes.route('/<int:id>', methods=['DELETE'])
def remove_user(id):
        # Query for the user
    user = User.query.get(id)

    # Check if the user exists
    if not user:
        return {"errors": "User not found"}, 404

    # Delete the user
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"})

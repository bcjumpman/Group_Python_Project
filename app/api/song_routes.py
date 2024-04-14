from flask import Blueprint, jsonify
from app.models import Song


song_routes = Blueprint('songs', __name__)

# @song_routes.route('/')
# def getAllSongs():
#   songs = Song.query.all()
#   return {'songs': [song.to_dict() for song in songs]}

# @song_routes('<int:id>')
# def getSongById(id):
#   song = Song.query.all()
#   return {'song': song}

# @song_routes('<int:id>', methods=["POST"])
# def getSongById(id):
#   song = Song.query.all()
#   return {'song': song}

# @song_routes('<int:id>/delete')
# def deleteSongById(id):
#   song = Song.query.all()
#   return {'song': song}

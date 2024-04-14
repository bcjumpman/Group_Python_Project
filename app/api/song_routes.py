from flask import Blueprint, jsonify
from app.models import db, Song, Like


song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def getAllSongs():
  songs = db.session.query(Song).join(Like).options(db.joinedload())
  return {'songs': [song.to_dict() for song in songs]}

# @song_routes('<int:id>')
# def getSongById(id):
#   song = Song.query.all()
#   return song.to_dict()

# @song_routes('<int:id>', methods=["POST"])
# def getSongById(id):
#   song = Song.query.all()
#   return song.to_dict()

# @song_routes('<int:id>/delete')
# def deleteSongById(id):
#   song = Song.query.all()
#   return song.to_dict()

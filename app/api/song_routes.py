from flask import Blueprint, jsonify, request
from app.models import db, Song, Like, Comment


song_routes = Blueprint('songs', __name__)

# Get all songs with like
@song_routes.route('/')
def getAllSongs():
  songs = db.session.query(Song).join(Like, Song.id == Like.song_id).all()

  all_songs = []

  for song in songs:
    per_song = song.to_dict()
    per_song['likes'] = len(song.likes)
    all_songs.append(per_song)

  return jsonify({'songs': all_songs})

# Get song by id
@song_routes.route('/<int:id>', methods=["GET"])
def getSongById(id):
  song = db.session.query(Song).join(Like, Song.id == Like.song_id).join(Comment, Song.id == Comment.song_id).filter(Song.id == id).one()
  query_song = song.to_dict()
  query_song['likes'] = len(song.likes)
  query_song['comments'] = [comment.to_dict() for comment in song.comments]

  return jsonify({"song": query_song})

@song_routes.route('/<int:id>', methods=["POST"])
def updateSongById(id):
  # Get song
  song = Song.query.get(id)

  # Get form data
  data = request.get_json()

  # update song with form data
  song.name = data['name']
  song.song_url = data['song_url']
  song.cover_art = data['cover_art']
  song.genre = data['genre']
  song.is_private = data['is_private']

  # commit to db
  db.session.commit()

  return song.to_dict()

# @song_routes.route('/<int:id>', methods=["PUT"])

# @song_routes.route('/<int:id>', methods=["DELETE"])
# def deleteSongById(id):
#   song = Song.query.all()
#   return song.to_dict()

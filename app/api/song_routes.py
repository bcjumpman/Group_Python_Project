from flask import Blueprint, jsonify, request
from app.models import db, Song, Like, Comment, User
from flask_login import login_required, current_user
import wave
from ..forms.song_form import SongForm
from . import aws as s3

song_routes = Blueprint('songs', __name__)

# Helper function to validate and upload song
def post_song(songForm):
    song = songForm.data["song_url"]

    song.filename = s3.get_unique_filename(song.filename)
    upload_song = s3.upload_file_to_s3(song)

    upload_pic = {"url": "No Image"}

    cover_art = songForm.data['cover_art']
    if cover_art:
        cover_art.filename = s3.get_unique_filename(cover_art.filename)
        upload_pic = s3.upload_file_to_s3(cover_art)

    user = User.query.get(current_user.id)
    new_song = Song(
        # user = user,
        name = songForm.data["name"],
        genre = songForm.data["genre"],
        is_private = songForm.data["is_private"],
        duration = songForm.data["duration"],
        plays = 0,
        user_id = current_user.id,
        song_url = upload_song['url'],
        cover_art = upload_pic['url']
    )

    db.session.add(new_song)
    db.session.commit()
    return new_song


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

#Upload a song
@song_routes.route('/', methods=["POST"])
@login_required
def post_song_route():
    form = SongForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      new_song = post_song(form)
      return new_song.to_dict()

    return {"errors": form.errors}, 401


# Get song by id
@song_routes.route('<int:id>', methods=["GET"])
def getSongById(id):
  song = db.session.query(Song).join(Like, Song.id == Like.song_id).join(Comment, Song.id == Comment.song_id).filter(Song.id == id).one()
  if not song:
    return jsonify({"message": f'No song was located with the id of {id}'})

  query_song = song.to_dict()
  query_song['likes'] = len(song.likes)
  query_song['comments'] = [comment.to_dict() for comment in song.comments]

  return jsonify({"song": query_song})

# Edit song by id
@song_routes.route('<int:id>', methods=["PUT"])
def updateSongById(id):
  data = request.get_json()
  song = Song.query.get(id)
  if not song:
    return jsonify({"message": f'No song was located with the id of {id}'})

  song.name = data['name']
  song.song_url = data['song_url']
  song.cover_art = data['cover_art']
  song.genre = data['genre']
  song.is_private = data['is_private']

  db.session.commit()

  return jsonify({"song": song})

# Delete song by id
@song_routes.route('<int:id>', methods=["DELETE"])
def deleteSongById(id):
  song = Song.query.get(id)
  if not song:
    return jsonify({"message": f'No song was located with the id of {id}'})
  db.session.delete(song)
  db.session.commit()
  return jsonify({"message": f"The song {song.name} was deleted successfully"})

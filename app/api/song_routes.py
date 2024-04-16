from flask import Blueprint, jsonify, request
from app.models import db, Song, Like, Comment
import wave

song_routes = Blueprint('songs', __name__)

## Read the music file to retrieve duration
# def get_duration_wave(file_path):
#    with wave.open(file_path, 'r') as audio_file:
#       frame_rate = audio_file.getframerate()
#       n_frames = audio_file.getnframes()
#       duration = n_frames / float(frame_rate)
#       return duration

# Get all songs with like
@song_routes.route('/')
def getAllSongs():
  songs = db.session.query(Song).join(Like, Song.id == Like.song_id).all()

  all_songs = []

  for song in songs:
    per_song = song.to_dict()
    per_song['likes'] = len(song.likes)
    all_songs.append(per_song)

  # if request.args:
  #   filter_list = []
  #   filtered = []

  #   for arg in request.args:
  #     filter_list.append((arg, request.args[arg]))

  #   def dynamic_filter(variable):
  #     if request.args[arg] in all_songs[arg]:
  #       return True
  #     else:
  #       return False

  #   filtered = filter(dynamic_filter, all_songs)
  #   print(filtered)

  #   return {'message': "this is filtered"}


  return jsonify({'songs': all_songs})

# Create new song
@song_routes.route('/', methods=["POST"])
def createNewSong():
  data = request.get_json()

  new_song = Song(
    name = data['name'],
    user_id = data['user_id'],
    song_url = data['song_url'],
    cover_art = data['cover_art'],
    genre = data['genre'],
    is_private = data['is_private'],
    # duration = get_duration_wave(data['song_url'])
    duration = 888,
    plays = 0
  )

  db.session.add(new_song)
  db.session.commit()

  return jsonify({"song": new_song.to_dict()})

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

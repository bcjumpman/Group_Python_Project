from ..models import db, Like, Song, User, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_likes():
    song_ids = [song.id for song in Song.query.all()]
    user_ids = [user.id for user in User.query.all()]

    seeded_num_likes = 200

    for _ in range(seeded_num_likes):
        # grab a random song and user
        song_id = random.choice(song_ids)
        user_id = random.choice(user_ids)

        new_like = Like(
            user_id = user_id,
            song_id = song_id
            )

        db.session.add(new_like)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()

from ..models import db, Comment, Song, User, environment, SCHEMA
from sqlalchemy.sql import text
import random

from faker import Faker

f = Faker()

def seed_comments():
    song_ids = [song.id for song in Song.query.all()]
    user_ids = [user.id for user in User.query.all()]

    num_comments = 20

    for _ in range(num_comments):
        song_id = random.choice(song_ids)
        user_id = random.choice(user_ids)
        comment = f.sentence(10)

        new_comment = Comment(
            user_id = user_id,
            song_id = song_id,
            body = comment
        )

        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

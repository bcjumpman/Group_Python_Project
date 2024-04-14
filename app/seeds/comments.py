from ..models import db, Comment, Song, User, environment, SCHEMA
from sqlalchemy.sql import text
import random

# from faker import Faker

# f = Faker()

def seed_comments():
    song_ids = [song.id for song in Song.query.all()]
    user_ids = [user.id for user in User.query.all()]

    random_comments = [
    "This track is straight fire 🔥 Can't stop hitting the replay button!",
    "Wow, such a unique sound! Definitely adding this to my playlist.",
    "The vibes on this song are so chill, perfect for late-night drives.",
    "Incredible production quality! You've got serious talent.",
    "This is exactly what I needed to hear today, thank you for sharing your music.",
    "I'm blown away by the lyrics, so deep and meaningful.",
    "The beat drop at 1:20 gave me goosebumps, pure magic!",
    "I can already picture this being played at festivals, it's a banger!",
    "Your voice is like velvet, absolutely mesmerizing.",
    "Listening to this feels like taking a journey, such a captivating track.",
    "This song deserves way more recognition, it's a hidden gem.",
    "I've been listening to this on repeat all day, can't get enough!",
    "The melody is stuck in my head, in the best way possible.",
    "The energy in this track is infectious, had me dancing from the start.",
    "I love how the instrumentation blends together seamlessly, pure artistry.",
    "Bravo! You've created something truly special here.",
    "The lyrics speak to my soul, I resonate with every word.",
    "This song has a nostalgic feel to it, reminds me of better times.",
    "I'm hooked from the first chord, amazing job!",
    "Thank you for sharing your talent with the world, can't wait to hear more from you!"
    ]


    num_comments = 20

    for _ in range(num_comments):
        song_id = random.choice(song_ids)
        user_id = random.choice(user_ids)
        comment = random.choice(random_comments)

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

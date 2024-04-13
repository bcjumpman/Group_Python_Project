from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
import random

# 50 songs
random_songs = [
    "Bad Guy", "Old Town Road", "Truth Hurts", "Someone You Loved", "Senorita",
    "Sucker", "Sunflower", "7 Rings", "Without Me", "Happier",
    "Dance Monkey", "Memories", "Circles", "Don't Start Now", "Life Goes On",
    "Watermelon Sugar", "Savage Love", "Rain On Me", "ROCKSTAR", "The Box",
    "Beat It", "Stuck with U", "Say So", "Toosie Slide", "Physical",
    "Break My Heart", "Before You Go", "Roses", "Adore You", "Whats Poppin",
    "Mood", "ily", "Blueberry Faygo", "The Bones", "Intentions", "Supalonely",
    "Whats Love Got to Do with It", "You Broke Me First", "Holy", "Come & Go",
    "If the World Was Ending", "Midnight Sky", "Ice Cream", "Falling", "Dynamite",
    "Lonely", "ily", "Positions", "Stupid Love", "Yummy", "What a Man Gotta Do"
]

# creators
user_ids = [1, 4, 5]

# genres
genres = ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae"]

# song URLs
song_urls = [
    "https://open.spotify.com/track/0Z7nGFVCLfixWctgePsRk9?si=cba08d89886443bc",
    "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P?si=d05b3b3e512c4700",
    "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=3e7e51e55df84d85",
    "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b?si=62e2716fb09d4e7a"
]

# cover art URLs
cover_art_urls = [
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982620/Music_Haze/iohre3ewyy2znr2hecws.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982620/Music_Haze/ldbomx7xevntn4zywvm9.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982620/Music_Haze/hqcxha3i0n9ulx1qjzdc.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982620/Music_Haze/q6eqlw5rj8rj1f3jnxxa.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/seo7stymloejhccno9bf.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/h3eu1pcwtljyqbtlyvzw.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/k3tplcyolwcjccsvwcdk.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/f4jjxqixbkp1ftu28z7a.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/l3weymaphestpwktxiqt.webp",
    "https://res.cloudinary.com/dkjaxm35z/image/upload/v1712982619/Music_Haze/uvn5qsvoakvl6s42taqz.webp"
]

# seed data dictionary
seed_songs = {}

for i in range(50):
    song_name = random.choice(random_songs)
    user_id = random.choice(user_ids)
    duration = random.randint(180, 360)
    cover_art = random.choice(cover_art_urls)
    plays = random.randint(0, 1000)
    genre = random.choice(genres)
    is_private = random.choice([True, False])
    song_url = random.choice(song_urls)


    new_song = Song(
        user_id=user_id,
        song_url=song_url,
        name=song_name,
        duration=duration,
        cover_art=cover_art,
        plays=plays,
        genres=genre,
        is_private=is_private
    )

    db.session.add(new_song)

db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()

from ..models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_songs():
    # 50 songs
    songs = [
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
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/African+Fella+-+Cumbia+Deli.mp3",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Brisket+Taco+-+Cumbia+Deli.mp3",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Don't+Fret+-+Quincas+Moreira.mp3",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Putting+On+The+Ritz+-+Freedom+Trail+Studio.mp3"
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Summer+Somewhere+In+Cuba+-+Cumbia+Deli.mp3"
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze_tracks/Woodshedder+-+Quincas+Moreira.mp3"
    ]

    # cover art URLs
    cover_art_urls = [
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/14.-Blink-182-%E2%80%98Enema-of-the-State-1999-album-art-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/22.-Drake-If-Youre-Reading-This-Its-Too-Late-2015-album-art-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/33.-Kanye-West-%E2%80%98My-Beautiful-Dark-Twisted-Fantasy-2010-album-art-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/47.-Janet-Jackson-%E2%80%98Rhythm-Nation-1814-1989-album-at-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/48.-Lady-Gaga-%E2%80%98The-Fame-Monster-2009-album-art-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/Bad-Bunny-Un-Verano-Sin-Ti-album-art-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/billie-holiday-lady-in-satin-cover-1958-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/outkast-stankonia-cover-2000-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/rihanna-anti-cover-2016-billboard-1240.webp",
        "https://musichazeapp.s3.us-west-1.amazonaws.com/music_haze/roxy-music-for-your-pleasure-cover-1973-billboard-1240.webp"
    ]

    for song in songs:
        song_name = song
        user_id = random.choice(user_ids)
        duration = random.randint(180, 360)
        cover_art = random.choice(cover_art_urls)
        plays = random.randint(0, 1000)
        genre = genres[random.randint(0, len(genres) -1)]
        is_private = random.choice([True, False])
        song_url = random.choice(song_urls)


        new_song = Song(
            user_id=user_id,
            song_url=song_url,
            name=song_name,
            duration=duration,
            cover_art=cover_art,
            plays=plays,
            genre=genre,
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

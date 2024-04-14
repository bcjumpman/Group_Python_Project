from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_url = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    cover_art = db.Column(db.String, nullable=False)
    plays = db.Column(db.Integer)
    genre = db.Column(db.String, nullable=False)
    is_private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate = datetime.now)

    user = db.relationship('User', back_populates='songs')
    comments = db.relationship('Comment', back_populates='song')
    likes = db.relationship('Like', back_populates='song')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'song_url': self.song_url,
            'name': self.name,
            'duration': self.duration,
            'cover_art': self.cover_art,
            'plays': self.plays,
            'genre': self.genre,
            'is_private': self.is_private,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired
from ..api.aws import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired


class SongForm(FlaskForm):
    song_url = FileField("Song URL", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    name = StringField("Name", validators=[DataRequired()])
    duration = IntegerField("Integer", validators=[DataRequired()])
    cover_art = FileField("Cover Art URL", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    genre = SelectField("Genre", validators=[DataRequired()], choices=[(genre, genre.capitalize()) for genre in ["pop", "rock", "jazz", "hip hop", "country", "classical", "electronic", "blues", "folk", "reggae"]])
    is_private = BooleanField("Private?", validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField, SubmitField
from wtforms.validators import DataRequired, URL


class SongForm(FlaskForm):
    song_url = StringField("Song URL", validators=[DataRequired(), URL()])
    name = StringField("Name", validators=[DataRequired()])
    duration = IntegerField("Integer", validators=[DataRequired()])
    cover_art = StringField("Cover Art URL", validators=[URL()])
    genre = SelectField("Genre", validators=[DataRequired()])
    is_private = BooleanField("Private?", validators=[DataRequired()])
    submit = SubmitField("Submit")

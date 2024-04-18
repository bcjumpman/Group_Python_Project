from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length


class UserForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(max=255)])
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    is_artist = BooleanField("Are you an artist?")
    artist_name = StringField("Stage Name")
    artist_country = StringField("Country")
    artist_bio = TextAreaField("Biography")
    submit = SubmitField("Submit")

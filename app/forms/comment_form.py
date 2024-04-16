from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    body = TextAreaField("Leave comment here", validators=[DataRequired(), Length(1000)])
    submit = SubmitField("Submit")

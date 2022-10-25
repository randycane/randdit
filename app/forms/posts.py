from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class PostForm(FlaskForm):
    post_title = StringField('name', validators=[DataRequired()])
    post_text = StringField('name', validators=[DataRequired()])
    image_url = StringField('name', validators=[DataRequired()])

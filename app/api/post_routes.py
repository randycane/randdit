from unicodedata import name
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db, Post, Subranddit, Comment, subranddit

from .auth_routes import login, validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

from ..forms.posts import PostForm

post_blueprint = Blueprint("post_blueprint", __name__)

# see all posts:
@post_blueprint.route("/")
def see_posts():
    response =[]
    allposts = Post.query.all()
    for onepost in allposts:
        response.append(onepost)
    return jsonify(response)

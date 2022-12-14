from unicodedata import name
from flask import Blueprint, jsonify, session, request, redirect

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

from app.models import User, db, Post, Subranddit, Comment, subranddit

from .auth_routes import login, validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

from ..forms.posts import PostForm
from ..forms.comments import CommentForm

post_blueprint = Blueprint("post_blueprint", __name__)

import json

# see all posts:
@post_blueprint.route("/")
def see_posts():
    response =[]
    allposts = Post.query.all()
    for onepost in allposts:
        response.append(onepost)
    return jsonify(response)

# edit your post on a subranddit (used):
@post_blueprint.route('/<int:postId>', methods = ["PUT"])
@login_required
def update_post(postId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    what = Post.query.get(postId)
    update = request.json

    if "post_title" in update.keys():
        what.post_title = update["post_title"]
        what.post_text = update["post_text"]
        what.image_url = update["image_url"]
        db.session.commit()
    return what.to_dict()

# see all comments under a post:
@post_blueprint.route("/<int:postId>", methods = ['GET'])
def read_comments():
    response = []
    allcomms = Comment.query.all()
    for onecomm in allcomms:
        response.append(onecomm.to_dict())
    return jsonify(response)

# create a comment under a post:
@post_blueprint.route("/<int:postId>", methods = ['POST'])
@login_required
def write_comment(postId):

    posttobe = Post.query.get(postId)
    if posttobe == None:
        return {"errors": "Post not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment(
            comment_text = form.data['comment_text']
        )

        db.session.add(new_comment)
        db.session.commit()
        return(new_comment.to_dict()), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# edit your comment on a post:
@post_blueprint.route('/<int:postId>/comments/<int:commentId>', methods = ["PUT"])
@login_required
def update_comment(postId, commentId):

    postrandy = Post.query.get(postId)
    if postrandy == None:
        return {"errors": "Post not found"}, 404

    whattoedit = Comment.query.get(commentId)
    if whattoedit == None:
        return {"errors": "Comment not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment_data = json.loads(request.data.decode('utf-8'))
        for k,v in comment_data.items():
            setattr(whattoedit, k, v)
        db.session.commit()
        return whattoedit.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a post:
@post_blueprint.route("/<int:post_id>", methods = ['DELETE'])
@login_required
def del_post(post_id):
    posttodel = Post.query.get(post_id)
    if not posttodel:
        return {"message": "This post does not exist"}, 404
    db.session.delete(posttodel)
    db.session.commit()
    return {
        "statusCode": 200,
        "message": "Successfully deleted."
    }

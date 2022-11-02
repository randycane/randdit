# from unicodedata import name
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db, Post, Subranddit, Comment
# from app.models.post import to_dict

from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

from ..forms.subranddits import SubrandditForm
from ..forms.posts import PostForm
import json

subranddit_blueprint = Blueprint("subranddit_blueprint", __name__)

# see all subranddits on home page for now:

@subranddit_blueprint.route("/")
def see_subs():
    response = []
    allsubs = Subranddit.query.all()
    for onesub in allsubs:
        response.append(onesub.to_dict())
    return jsonify(response)

# create a subranddit:

@subranddit_blueprint.route("/", methods = ["POST"])
@login_required
def create_sub():

    form = SubrandditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_sub = Subranddit(
            title = form.data['title'],
            description = form.data['description'],
            image_url = form.data['image_url'],
            author_id = current_user.id
        )

        db.session.add(new_sub)
        db.session.commit()
        return new_sub.to_dict()

# update a subranddit:

@subranddit_blueprint.route("/<int:subrandditId>/edit", methods=["PUT"])
@login_required
def edit_sub(subrandditId):

    form = SubrandditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    subrandy_to_edit = Subranddit.query.get(subrandditId)

    if form.validate_on_submit():
        subrandy_to_edit.title = form.data['title']
        subrandy_to_edit.description = form.data['description']
        subrandy_to_edit.image_url = form.data['image_url']

        db.session.commit()
        return subrandy_to_edit.to_dict()

# delete a subranddit:
@subranddit_blueprint.route("/<int:subrandditId>/delete", methods=["DELETE"])
@login_required
def delete_sub(subrandditId):
    whichsub = Subranddit.query.get(subrandditId)

    db.session.delete(whichsub)
    db.session.commit()
    return {
        "statusCode": 200,
        "message": "Successfully deleted"
    }

# see all posts under a subranddit by subranddit id working:

@subranddit_blueprint.route('/<int:subrandditId>/posts', methods = ["GET"])
def see_all_posts(subrandditId):
    response = []
    allposts = Post.query.filter(Post.subranddit_id==subrandditId)
    for onepost in allposts:
        response.append(onepost.to_dict())
    return jsonify(response)

# see postcard by the post id:
@subranddit_blueprint.route('/<int:subrandditId>/posts/<int:postId>', methods = ["GET"])
def read_one(postId):
    subpost = Post.query.get(postId)
    if subpost== None:
        return {"errors": "Subranddit not found"}, 404
    return jsonify(subpost)

#create a post:
@subranddit_blueprint.route('/<int:subrandditId>', methods = ["POST"])
@login_required
def create_post(subrandditId):

    # subrandy = Subranddit.query.get(subrandditId)
    # if subrandy == None:
    #     return {"errors": "Subranddit not found"}, 404

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_post = Post(
            post_title = form.data['post_title'],
            post_text = form.data['post_text'],
            image_url = form.data['image_url'],
            author_id = current_user.id,
            subranddit_id= subrandditId
        )

        db.session.add(new_post)
        db.session.commit()
        return(new_post.to_dict()), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# edit your post on a subranddit works:
@subranddit_blueprint.route('/<int:subrandditId>/posts/<int:postId>', methods = ["PUT"])
@login_required
def update_post(subrandditId, postId):

    subrandy = Subranddit.query.get(subrandditId)
    if subrandy == None:
        return {"errors": "Subranddit not found"}, 404

    whattoedit = Post.query.get(postId)
    if whattoedit == None:
        return {"errors": "Post not found"}, 404

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post_data = json.loads(request.data.decode('utf-8'))
        for k,v in post_data.items():
            setattr(whattoedit, k, v)
        db.session.commit()
        return whattoedit.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

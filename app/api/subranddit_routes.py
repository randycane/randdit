from unicodedata import name
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db, Post, Subranddit, Comment, subranddit
from app.models.post import to_dict

from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

from ..forms.subranddits import SubrandditForm
from ..forms.posts import PostForm

subranddit_blueprint = Blueprint("subranddit_blueprint", __name__)

# see subranddits:

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
            image_url = form.data['image_url']
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
@subranddit_blueprint.route("/<int:subrandditId>/edit", methods=["DELETE"])
@login_required
def delete_sub(subrandditId):
    whichsub = Subranddit.query.get(subrandditId)

    db.session.delete(whichsub)
    db.session.commit()
    return {
        "statusCode": 200,
        "message": "Successfully deleted"
    }

# create a post on a subranddit:
@subranddit_blueprint.route('/<int:subrandditId>', methods = ["POST"])
@login_required
def create_post():

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_post = Post(
            post_title = form.data['post_title'],
            post_text = form.data['post_text'],
            image_url = form.data['image_url'],
            author_id = form.data['author_id'],
        )

        db.session.add(new_post)
        db.session.commit()
        return(new_post(to_dict()))

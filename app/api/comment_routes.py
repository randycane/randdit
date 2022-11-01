# from socket import J1939_PGN_REQUEST
# from unicodedata import name
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db, Post, Subranddit, Comment, subranddit
# from app.models.post import to_dict

from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_user, logout_user, login_required

from ..forms.subranddits import SubrandditForm
from ..forms.posts import PostForm
from ..forms.comments import CommentForm

import json

comment_blueprint = Blueprint("comment_blueprint", __name__)

# see all comments under a post:
# @comment_blueprint.route("/")
# def read_comments():
#     response = []
#     allcomms = Comment.query.all()
#     for onecomm in allcomms:
#         response.append(onecomm.to_dict())
#     return jsonify(response)


# delete a comment:
@comment_blueprint.route("/<int:commentId>", methods = ['DELETE'])
@login_required
def del_comm(commentId):
    commtodel = Comment.query.get(commentId)
    if not commtodel:
        return {"message": "This comment does not exist"}, 404
    db.session.delete(commtodel)
    db.session.commit()
    return {
        "statusCode": 200,
        "message": "Successfully deleted"
    }

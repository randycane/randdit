# from turtle import back
from .db import db
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String, nullable=False)

    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    post = relationship("Post", back_populates="comments")
    user = relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "Post": self.post_to_dict(),
            "User": self.user_to_dict()
        }
    def post_to_dict(self):
        return {
            "id": self.post.id,
            "post_title": self.post_title,
            "post_text": self.post_text,
            "image_url": self.image_url,
            "author_id": self.author_id,
            # "subranddit_id": self.subranddit.id
        }
    def user_to_dict(self):
        return {
            'username': self.user.username,
            'email': self.user.email
        }

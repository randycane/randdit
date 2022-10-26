# from turtle import back
from .db import db
from sqlalchemy.orm import relationship
from .post import Post

class Subranddit(db.Model):
    __tablename__ = "subranddits"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # relationships:
    post = relationship("Post", back_populates="subranddit", cascade="all, delete-orphan")
    user = relationship("User", back_populates="subranddit")

    def to_dict(self):
        response = {
            "id":self.id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "author_id": self.author_id,
            "posts": [ post.to_dict() for post in self.post],
            "user": self.user.to_dict()
        }

        return response

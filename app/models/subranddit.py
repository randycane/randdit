from turtle import back
from .db import db
from sqlalchemy.orm import relationship

class Subranddit(db.Model):
    __table__name = "subranddits"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    description = db.Column(db.String)
    image_url = db.Column(db.String)

    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    post = relationship("Post", back_populates="subranddit")
    user = relationship("User", back_populates="subranddit")

    def to_dict(self):
        return self.title

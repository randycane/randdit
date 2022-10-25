from .db import db
from sqlalchemy.orm import relationship

class Post(db.Model):
    __table__name = "posts"

    id = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(100), nullable=False)
    post_text = db.Column(db.String)
    image_url = db.Column(db.String)

    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    subranddit_id = db.Column(db.Integer, db.ForeignKey("subranddit.id"))

    comment = relationship("Comment", back_populates="post")
    user = relationship("User", back_populates="post")

def to_dict(self):
    response = {
        "id": self.id,
        "post_title": self.post_title,
        "post_text": self.post_text,
        "image_url": self.image_url,
        "author_id": self.author_id,
        "subranddit_id": self.subranddit.id
    }

    return response

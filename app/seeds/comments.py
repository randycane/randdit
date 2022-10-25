from app.models import subranddit
from ..models import Comment, db

def undo_comments():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_comments():
    commentsArray= [{
        "comment_text": "Obviously Kisaki",
        "post_id": 1,
        "author_id": 1
    },
    {
        "comment_text": "Obviously Hanma",
        "post_id": 1,
        "author_id": 3
    },
    {
        "comment_text": "Obviously Mikey",
        "post_id": 2,
        "author_id": 4
    },
    {
        "comment_text": "Obviously Draken",
        "post_id": 2,
        "author_id": 5
    },
    {
        "comment_text": "Yurrrrrrrrr! She underrated bro",
        "post_id": 4,
        "author_id": 6
    },
    {
        "comment_text": "Obviously nah",
        "post_id": 4,
        "author_id": 6
    },
    ]
    for commrandy in commentsArray:
        newrandy = Comment(
            comment_text = commrandy["comment_text"],
            post_id = commrandy['post_id'],
            author_id = commrandy['author_id'],
        )
        db.session.add(newrandy)
    db.session.commit()

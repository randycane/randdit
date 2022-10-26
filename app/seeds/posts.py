from app.models import Subranddit, db
from ..models import Post, db

def undo_posts():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_posts():
    postsArray= [{
        "post_title": "Who is the bigger villain?",
        "post_text": "Hanma or Kisaki?",
        "image_url": "https://i.pinimg.com/736x/f5/58/6c/f5586c32f58cdadc4b2d852337e95c44.jpg",
        "author_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Who is the best fighter?",
        "post_text": "Mikey or Draken?",
        "image_url": "https://i1.sndcdn.com/artworks-6Pz3gHOqky5HQajF-5FmqhA-t500x500.jpg",
        "author_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Chapter 299 Discussion Post",
        "post_text": "Discuss thoughts here",
        "image_url": "https://images.mid-day.com/images/images/2016/feb/06-Manji-symbol.jpg",
        "author_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Appreciation Post",
        "post_text": "Can we all agree that Emma is best girl?",
        "image_url": "https://thicc.mywaifulist.moe/waifus/38197/40b924e41091678f0ad8eb359a588b8d328529250b08f774f8df529bfb12e3d2_thumb.jpg",
        "author_id": 2,
        "subranddit_id": 1
    },
    {
        "post_title": "Hot Take Alert",
        "post_text": "Akkun is a better fighter than Pah",
        "image_url": "https://i.pinimg.com/736x/60/08/de/6008debff894a6e04026449a5a99a580.jpg",
        "author_id": 2,
        "subranddit_id": 1
    }]
    for postrandy in postsArray:
        newrandy = Post(
            post_title = postrandy["post_title"],
            post_text = postrandy['post_text'],
            image_url = postrandy['image_url'],
            author_id= postrandy['author_id'],
            subranddit_id = postrandy['subranddit_id']
        )
        db.session.add(newrandy)
    db.session.commit()
    print("Sucessfully seeded posts")

# from ..models import Subranddit, db
from app.models import Subranddit, db


def seed_subranddits():
    subRandArray= [{
        "title": "Tokyo Revengers",
        "description": "Welcome to the subranddit for fans of Wakui's anime/manga. Diehard weebs found here",
        "image_url": "https://static.dw.com/image/54725424_605.jpg",
        "author_id": 2
    },
    {
        "title": "A Letter from Baji Keisuke",
        "description": "Welcome to the subranddit for fans of the Tokyo Revengers spin-off. Diehard weebs found here",
        "image_url": "https://i.pinimg.com/originals/9b/25/6e/9b256e2da0f5e5952cb89eab7fd269db.jpg",
        "author_id": 2
    },
    {
        "title": "Rent a Girlfriend",
        "description": "Welcome to the subranddit for fans of Rent a Girlfriend! No shame here!",
        "image_url": "https://static.wikia.nocookie.net/p__/images/1/18/Mizuhara.Chizuru.full.3006209.png/revision/latest?cb=20201001131031&path-prefix=protagonist",
        "author_id": 2
    },
    {
        "title": "Attack on Titan",
        "description": "Welcome to the subranddit for fans of Shingeki no Kyojin. Sasageyo!",
        "image_url": "https://media.dayoftheshirt.com/images/shirts/fVXzq/teepublic_hi-res-attack-on-titan-scout-regiment-logo-teepublic_1644891664.large.png",
        "author_id": 2
    },
    {
        "title": "Dr. Stone",
        "description": "Welcome to the subranddit for fans of Dr. Stone!",
        "image_url": "https://i0.wp.com/film-bunker.com/wp-content/uploads/2019/11/https___hypebeast.com_image_2019_09_dr-stone-documentary-hypebeast-exclusive-clip-00.jpg?fit=900%2C600&ssl=1",
        "author_id": 2
    }]
    for subrandy in subRandArray:
        newrandy = Subranddit(
            title = subrandy["title"],
            description = subrandy['description'],
            image_url = subrandy['image_url'],
            author_id= subrandy['author_id'],
        )
        db.session.add(newrandy)
    db.session.commit()

def undo_subranddits():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()

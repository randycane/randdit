from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    shinichiro = User(
        username='shinichiro', email='shinichiro@aa.io', password='password')
    manjiro = User(
        username='manjiro', email='manjiro@aa.io', password='password')
    baji = User(
        username='baji', email='baji@aa.io', password='password')
    chifuyu = User(
        username='chifuyu', email='chifuyu@aa.io', password='password')
    smiley = User(
        username='smiley', email='smiley@aa.io', password='password')

    db.session.add(demo)
    db.session.add(shinichiro)
    db.session.add(manjiro)
    db.session.add(baji)
    db.session.add(chifuyu)
    db.session.add(smiley)

    db.session.commit()
    print("Sucessfully seeded usies")


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

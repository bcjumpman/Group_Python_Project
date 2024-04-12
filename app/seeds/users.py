from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User", is_artist=True, artist_name="Demo User", artist_country="Nowhere", artist_bio="I'm the best!")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="marnie", last_name="Jane", is_artist=False)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="bobbie", last_name="brown", is_artist=False )
    brian = User(
        username='brian', email='brian@aa.io', password='password', first_name="brian", last_name="jackson", is_artist=True, artist_name="Brian Jax", artist_country="Spain", artist_bio="Check out my futuristic music page!")
    austin = User(
        username='austin', email='austin@aa.io', password='password', first_name="austin", last_name="lane", is_artist=True, artist_name="6spAdes", artist_country="France", artist_bio="Aspiring music composer and arranger.")
    kiante = User(
        username='kiante', email='kiante@aa.io', password='password', first_name="kiante", last_name="moore", is_artist=False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brian)
    db.session.add(austin)
    db.session.add(kiante)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

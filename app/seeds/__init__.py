from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subranddits import seed_subranddits, undo_subranddits
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add other seed functions here
    seed_users()
    seed_subranddits()
    seed_posts()
    seed_comments()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_users()
    undo_subranddits()
    undo_posts()
    undo_comments()

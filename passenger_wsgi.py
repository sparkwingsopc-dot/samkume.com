import sys
import os

# Add the current directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Import the FastAPI application from main.py
from main import app

# Import the ASGI to WSGI adapter
from a2wsgi import ASGIMiddleware

# Wrap the FastAPI application (ASGI) to make it compatible with WSGI (Phusion Passenger)
application = ASGIMiddleware(app)

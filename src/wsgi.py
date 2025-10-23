#!/usr/bin/env python3
"""
WSGI entry point for JWT Authentication App
"""
import os
import sys

# Add the src directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
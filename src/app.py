from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.models import db
from api.routes import api
import os

def create_app():
    app = Flask(__name__)
    
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    
    app.config["JWT_SECRET_KEY"] = "guille123"
    

    db.init_app(app)
    jwt = JWTManager(app)
    
    
    CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])  # Ajusta según tu puerto de React
    
    
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def serve_react_app():
        return send_from_directory('../front/dist', 'index.html')
    
    @app.route('/<path:path>')
    def serve_static_files(path):
        return send_from_directory('../front/dist', path)
    
    
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
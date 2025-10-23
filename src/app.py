from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.models import db
from api.routes import api
import os

def create_app():
    app = Flask(__name__)
    
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///project.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'guille123')
    
    
    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app)
    
    
    app.register_blueprint(api, url_prefix='/api')
    
    
    @app.route('/')
    def hello():
        return jsonify({"message": "🚀 JWT Auth API is running!"})
    
    
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
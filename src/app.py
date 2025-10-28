from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from api.models import db, User
from api.routes import api
import os

def create_app():
    app = Flask(__name__)
    
    # Configuración
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///project.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'guille123')
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
    
    # Inicializar extensiones
    db.init_app(app)
    jwt = JWTManager(app)
    
    # CORS CONFIGURACIÓN COMPLETA
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Configurar Admin
    admin = Admin(app, name='JWT Auth Admin', template_mode='bootstrap3', url='/admin')
    admin.add_view(ModelView(User, db.session))
    
    # Registrar Blueprint
    app.register_blueprint(api, url_prefix='/api')
    
    # Ruta raíz - MEJORADA
    @app.route('/')
    def hello():
        return jsonify({
            "message": "🚀 JWT Auth API is running!", 
            "status": "active",
            "port": 3001,
            "endpoints": {
                "register": "/api/register",
                "login": "/api/login", 
                "protected": "/api/protected",
                "users": "/api/users",
                "admin": "/admin"
            },
            "cors": {
                "allowed_origins": ["http://localhost:3000", "http://127.0.0.1:3000"]
            }
        })
    
    # Ruta de health check - MEJORADA
    @app.route('/health')
    def health():
        return jsonify({
            "status": "healthy", 
            "service": "jwt-auth",
            "port": 3001,
            "timestamp": "now"
        })
    
    # Ruta de prueba de CORS
    @app.route('/api/test-cors', methods=['GET', 'POST', 'OPTIONS'])
    def test_cors():
        return jsonify({
            "message": "CORS test successful",
            "cors_enabled": True,
            "allowed_origins": ["http://localhost:3000", "http://127.0.0.1:3000"]
        })
    
    # Crear tablas
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")
        print("🔐 JWT Configuration: OK")
        print("🌐 Backend running on: http://localhost:3001")
        print("👨‍💼 Admin Interface: http://localhost:3001/admin")
        print("🔧 CORS configured for: http://localhost:3000")
    
    return app

app = create_app()

if __name__ == '__main__':
    print("🚀 Starting JWT Auth Server...")
    print("📡 Server will be available at: http://localhost:3001")
    print("🔧 Debug mode: ON")
    app.run(host='0.0.0.0', port=3001, debug=True)
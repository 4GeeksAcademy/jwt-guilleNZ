from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

# ENDPOINT: Obtener todos los usuarios (protegido)
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    try:
        users = User.query.all()
        return jsonify({
            "success": True,
            "users": [user.serialize() for user in users],
            "count": len(users)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "msg": "Error retrieving users"}), 500

# ENDPOINT: Registro de usuario
@api.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        
        # Validaciones
        if not data:
            return jsonify({"success": False, "msg": "No data provided"}), 400
            
        if 'email' not in data or not data['email']:
            return jsonify({"success": False, "msg": "Email is required"}), 400
            
        if 'password' not in data or not data['password']:
            return jsonify({"success": False, "msg": "Password is required"}), 400
        
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"success": False, "msg": "User already exists"}), 400
        
        # Crear nuevo usuario
        new_user = User(email=data['email'], is_active=True)
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "msg": "User registered successfully",
            "user": new_user.serialize()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "msg": "Server error during registration"}), 500

# ENDPOINT: Login de usuario
@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validaciones
        if not data:
            return jsonify({"success": False, "msg": "No data provided"}), 400
            
        if 'email' not in data or not data['email']:
            return jsonify({"success": False, "msg": "Email is required"}), 400
            
        if 'password' not in data or not data['password']:
            return jsonify({"success": False, "msg": "Password is required"}), 400
        
        # Buscar usuario
        user = User.query.filter_by(email=data['email']).first()
        
        # Verificar usuario y contraseña
        if not user:
            return jsonify({"success": False, "msg": "Invalid email or password"}), 401
            
        if not user.check_password(data['password']):
            return jsonify({"success": False, "msg": "Invalid email or password"}), 401
        
        # Crear token JWT
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            "success": True,
            "msg": "Login successful",
            "token": access_token,
            "user": user.serialize()
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "msg": "Server error during login"}), 500

# ENDPOINT: Ruta protegida
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"success": False, "msg": "User not found"}), 404
        
        return jsonify({
            "success": True,
            "msg": "Access granted to protected route",
            "user": {
                "id": user.id,
                "email": user.email,
                "is_active": user.is_active
            }
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "msg": "Authentication error"}), 401

# ENDPOINT: Verificar token
@api.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        return jsonify({
            "success": True,
            "valid": True,
            "user": user.serialize() if user else None
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "valid": False, "msg": "Invalid token"}), 401

# ENDPOINT: Obtener perfil de usuario actual
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user:
            return jsonify({
                "success": True,
                "user": user.serialize()
            }), 200
        else:
            return jsonify({"success": False, "msg": "User not found"}), 404
            
    except Exception as e:
        return jsonify({"success": False, "msg": "Error retrieving profile"}), 500
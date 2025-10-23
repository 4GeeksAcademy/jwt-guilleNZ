from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"msg": "Usuario ya existe"}), 400
        
        new_user = User(email=data['email'], is_active=True)
        new_user.set_password(data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "msg": "Usuario registrado exitosamente",
            "user": new_user.serialize()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error en el servidor"}), 500

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            token_user = create_access_token(identity=str(user.id))
            return jsonify({
                "token": token_user,
                "user": user.serialize()
            }), 200
        
        return jsonify({"msg": "Email o contraseña incorrectos"}), 400
        
    except Exception as e:
        return jsonify({"msg": "Error en el servidor"}), 500

@api.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user:
            return jsonify({
                "msg": "Acceso autorizado",
                "user_id": user.id,
                "email": user.email
            }), 200
        
        return jsonify({"msg": "Usuario no encontrado"}), 404
        
    except Exception as e:
        return jsonify({"msg": "Error de autenticación"}), 401
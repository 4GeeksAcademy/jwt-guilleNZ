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
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Usuario ya existe"}), 400
    
    new_user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    
    if user is None:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 400
    
    token_user = create_access_token(identity=str(user.id))
    return jsonify({"token": token_user}), 200

@api.route("/protected", methods=['GET'])  
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        return jsonify({"user_id": user.id, "email": user.email}), 200 
    return jsonify({"msg": "Usuario no encontrado"}), 404
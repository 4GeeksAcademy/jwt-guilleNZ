from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_admin.contrib.sqla import ModelView

db = SQLAlchemy()

# Vista personalizada para el Admin
class UserModelView(ModelView):
    column_list = ['id', 'email', 'is_active']
    column_searchable_list = ['email']
    column_filters = ['is_active']
    form_columns = ['email', 'is_active']
    
    def on_model_change(self, form, model, is_created):
        if is_created and 'password' in form:
            model.set_password(form.password.data)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        """Genera un hash seguro de la contraseña"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifica si la contraseña coincide con el hash"""
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
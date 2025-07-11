import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.evento import db
from src.routes.eventos import eventos_bp
from src.routes.notificacoes import notificacoes_bp
from src.routes.testes import testes_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'sig-se-sistema-monitoramento-2025'

# Habilitar CORS para permitir requisições do frontend
CORS(app, origins=['http://localhost:5173', 'http://127.0.0.1:5173'])

# Registrar blueprints da API
app.register_blueprint(eventos_bp, url_prefix='/api')
app.register_blueprint(notificacoes_bp, url_prefix='/api')
app.register_blueprint(testes_bp, url_prefix='/api')

# Configuração do banco de dados SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Criar tabelas do banco de dados
with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Servir arquivos estáticos do frontend React"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

@app.route('/api/health')
def health_check():
    """Endpoint de verificação de saúde da API"""
    return {'status': 'ok', 'message': 'API SIG-SE funcionando corretamente'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


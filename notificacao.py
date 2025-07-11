from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Notificacao(db.Model):
    """Modelo de dados para notificações do sistema UNIAE"""
    
    __tablename__ = 'notificacoes'
    
    id = db.Column(db.Integer, primary_key=True)
    id_notificacao = db.Column(db.String(50), unique=True, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  # evento_geral, lgpd_alerta
    titulo = db.Column(db.String(200), nullable=False)
    mensagem = db.Column(db.Text, nullable=False)
    prioridade = db.Column(db.String(20), default='normal')  # alta, normal, baixa
    lida = db.Column(db.Boolean, default=False)
    
    # Dados relacionados ao evento
    id_evento_relacionado = db.Column(db.String(50))
    dados_evento = db.Column(db.Text)  # JSON com dados do evento
    
    # Metadados
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Notificacao {self.id_notificacao}: {self.titulo}>'
    
    def to_dict(self):
        """Converter para dicionário"""
        return {
            'id': self.id_notificacao,
            'tipo': self.tipo,
            'titulo': self.titulo,
            'mensagem': self.mensagem,
            'prioridade': self.prioridade,
            'lida': self.lida,
            'timestamp': self.created_at.isoformat(),
            'dados': json.loads(self.dados_evento) if self.dados_evento else {}
        }
    
    @staticmethod
    def criar_notificacao_evento(evento, tipo='evento_geral'):
        """Criar notificação para um evento"""
        from datetime import datetime
        
        # Gerar ID único para notificação
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        id_notificacao = f"notif-{timestamp}"
        
        if tipo == 'lgpd_alerta':
            titulo = 'ALERTA DE CONFORMIDADE (LGPD)'
            mensagem = 'Novo caso de saúde sensível requer verificação imediata'
            prioridade = 'alta'
            dados = {
                'id_evento': evento.id_evento,
                'estudante': '*** DADOS PROTEGIDOS ***',
                'processo_sei': evento.numero_processo_sei,
                'responsavel': evento.responsavel_uniae
            }
        else:
            titulo = 'Novo evento registrado'
            mensagem = f'{evento.nome_evento} foi registrado por {evento.responsavel_uniae}'
            prioridade = 'normal'
            dados = {
                'id_evento': evento.id_evento,
                'tipo_evento': evento.tipo_de_evento,
                'responsavel': evento.responsavel_uniae
            }
        
        notificacao = Notificacao(
            id_notificacao=id_notificacao,
            tipo=tipo,
            titulo=titulo,
            mensagem=mensagem,
            prioridade=prioridade,
            id_evento_relacionado=evento.id_evento,
            dados_evento=json.dumps(dados)
        )
        
        return notificacao


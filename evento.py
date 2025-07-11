from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Evento(db.Model):
    """Modelo de dados para eventos do sistema UNIAE"""
    
    __tablename__ = 'eventos'
    
    # Campos principais (24 colunas conforme documentação)
    id = db.Column(db.Integer, primary_key=True)
    id_evento = db.Column(db.String(50), unique=True, nullable=False)  # PSE-, CAMP-, ADM-, EVENT-, CUID-
    tipo_de_evento = db.Column(db.String(100), nullable=False)
    nome_evento = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default='Planejado')
    data_inicio = db.Column(db.Date)
    data_fim = db.Column(db.Date)
    unidade_escolar_inep = db.Column(db.String(20))
    nome_unidade_escolar = db.Column(db.String(200))
    responsavel_uniae = db.Column(db.String(100))
    numero_processo_sei = db.Column(db.String(50))
    tematica_pse_principal = db.Column(db.String(100))
    indicador_pse_prioritario = db.Column(db.Boolean)
    orgao_parceiro = db.Column(db.String(200))
    publico_alvo_estimado = db.Column(db.Integer)
    resultado_alcancado = db.Column(db.Integer)
    
    # Campos sensíveis LGPD
    nome_estudante_envolvido = db.Column(db.String(200))
    diagnostico_resumido = db.Column(db.Text)
    medicacao_prescrita = db.Column(db.Text)
    procedimento_emergencia = db.Column(db.Text)
    comparecimento_consulta = db.Column(db.String(50))
    motivo_falta_registrado = db.Column(db.Text)
    
    # Campos adicionais
    custo_estimado_reais = db.Column(db.Float)
    avaliacao_qualitativa = db.Column(db.Text)
    observacoes_gerais = db.Column(db.Text)
    
    # Metadados
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Evento {self.id_evento}: {self.nome_evento}>'
    
    def to_dict(self, include_lgpd=False):
        """Converter para dicionário, com opção de incluir dados LGPD"""
        data = {
            'ID_Evento': self.id_evento,
            'Tipo_de_Evento': self.tipo_de_evento,
            'Nome_Evento': self.nome_evento,
            'Status': self.status,
            'Data_Inicio': self.data_inicio.isoformat() if self.data_inicio else None,
            'Data_Fim': self.data_fim.isoformat() if self.data_fim else None,
            'Unidade_Escolar_INEP': self.unidade_escolar_inep,
            'Nome_Unidade_Escolar': self.nome_unidade_escolar,
            'Responsavel_UNIAE': self.responsavel_uniae,
            'Numero_Processo_SEI': self.numero_processo_sei,
            'Tematica_PSE_Principal': self.tematica_pse_principal,
            'Indicador_PSE_Prioritario': 'Sim' if self.indicador_pse_prioritario else 'Não' if self.indicador_pse_prioritario is not None else None,
            'Orgao_Parceiro': self.orgao_parceiro,
            'Publico_Alvo_Estimado': self.publico_alvo_estimado,
            'Resultado_Alcancado': self.resultado_alcancado,
            'Comparecimento_Consulta': self.comparecimento_consulta,
            'Motivo_Falta_Registrado': self.motivo_falta_registrado,
            'Custo_Estimado_Reais': self.custo_estimado_reais,
            'Avaliacao_Qualitativa': self.avaliacao_qualitativa,
            'Observacoes_Gerais': self.observacoes_gerais
        }
        
        # Campos LGPD - só incluir se autorizado
        if include_lgpd:
            data.update({
                'Nome_Estudante_Envolvido': self.nome_estudante_envolvido,
                'Diagnostico_Resumido': self.diagnostico_resumido,
                'Medicacao_Prescrita': self.medicacao_prescrita,
                'Procedimento_Emergencia': self.procedimento_emergencia
            })
        else:
            # Proteger dados sensíveis
            data.update({
                'Nome_Estudante_Envolvido': '*** DADOS PROTEGIDOS ***' if self.nome_estudante_envolvido else None,
                'Diagnostico_Resumido': '*** DADOS PROTEGIDOS ***' if self.diagnostico_resumido else None,
                'Medicacao_Prescrita': '*** DADOS PROTEGIDOS ***' if self.medicacao_prescrita else None,
                'Procedimento_Emergencia': '*** DADOS PROTEGIDOS ***' if self.procedimento_emergencia else None
            })
        
        return data
    
    @staticmethod
    def gerar_id_evento(tipo_evento):
        """Gerar ID único baseado no tipo de evento"""
        from datetime import datetime
        
        prefixos = {
            'Ação Coletiva PSE': 'PSE',
            'Campanha de Saúde Específica': 'CAMP',
            'Demanda Administrativa': 'ADM',
            'Evento/Fórum': 'EVENT',
            'Atendimento de Saúde Individual': 'CUID'
        }
        
        prefixo = prefixos.get(tipo_evento, 'UNKN')
        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
        
        return f"{prefixo}-{timestamp}"


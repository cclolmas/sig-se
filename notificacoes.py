from flask import Blueprint, request, jsonify
from src.models.notificacao import db, Notificacao

notificacoes_bp = Blueprint('notificacoes', __name__)

@notificacoes_bp.route('/notificacoes', methods=['GET'])
def listar_notificacoes():
    """Endpoint para listar notificações (simula Microsoft Teams)"""
    try:
        # Parâmetros de filtro
        tipo = request.args.get('tipo')
        apenas_nao_lidas = request.args.get('nao_lidas') == 'true'
        
        # Query base
        query = Notificacao.query
        
        # Aplicar filtros
        if tipo:
            query = query.filter(Notificacao.tipo == tipo)
        
        if apenas_nao_lidas:
            query = query.filter(Notificacao.lida == False)
        
        # Ordenar por data de criação (mais recentes primeiro)
        notificacoes = query.order_by(Notificacao.created_at.desc()).all()
        
        # Converter para dicionário
        notificacoes_dict = [notif.to_dict() for notif in notificacoes]
        
        # Estatísticas
        total = len(notificacoes_dict)
        nao_lidas = len([n for n in notificacoes_dict if not n['lida']])
        alertas_lgpd = len([n for n in notificacoes_dict if n['tipo'] == 'lgpd_alerta' and not n['lida']])
        
        return jsonify({
            'success': True,
            'notificacoes': notificacoes_dict,
            'estatisticas': {
                'total': total,
                'nao_lidas': nao_lidas,
                'alertas_lgpd': alertas_lgpd
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@notificacoes_bp.route('/notificacoes/<id_notificacao>/marcar-lida', methods=['PUT'])
def marcar_notificacao_lida(id_notificacao):
    """Endpoint para marcar notificação como lida"""
    try:
        notificacao = Notificacao.query.filter_by(id_notificacao=id_notificacao).first()
        
        if not notificacao:
            return jsonify({
                'success': False,
                'message': 'Notificação não encontrada'
            }), 404
        
        notificacao.lida = True
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Notificação marcada como lida'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@notificacoes_bp.route('/notificacoes/estatisticas', methods=['GET'])
def obter_estatisticas_notificacoes():
    """Endpoint para obter estatísticas das notificações"""
    try:
        total = Notificacao.query.count()
        nao_lidas = Notificacao.query.filter_by(lida=False).count()
        alertas_lgpd = Notificacao.query.filter_by(tipo='lgpd_alerta', lida=False).count()
        
        return jsonify({
            'success': True,
            'estatisticas': {
                'total': total,
                'nao_lidas': nao_lidas,
                'alertas_lgpd': alertas_lgpd
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500


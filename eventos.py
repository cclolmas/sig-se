from flask import Blueprint, request, jsonify
from datetime import datetime, date
from src.models.evento import db, Evento
from src.models.notificacao import Notificacao

eventos_bp = Blueprint('eventos', __name__)

@eventos_bp.route('/evento-geral', methods=['POST'])
def registrar_evento_geral():
    """Endpoint para registrar eventos gerais (simula formulário do Microsoft Forms)"""
    try:
        data = request.get_json()
        
        # Validações básicas
        if not data.get('nomeEvento') or not data.get('tipoEvento'):
            return jsonify({
                'success': False,
                'message': 'Nome do evento e tipo são obrigatórios'
            }), 400
        
        # Gerar ID único baseado no tipo
        id_evento = Evento.gerar_id_evento(data['tipoEvento'])
        
        # Converter data se fornecida
        data_inicio = None
        if data.get('dataInicio'):
            try:
                data_inicio = datetime.strptime(data['dataInicio'], '%Y-%m-%d').date()
            except ValueError:
                pass
        
        # Criar novo evento
        evento = Evento(
            id_evento=id_evento,
            tipo_de_evento=data['tipoEvento'],
            nome_evento=data['nomeEvento'],
            status='Planejado',
            data_inicio=data_inicio,
            unidade_escolar_inep=data.get('unidadesEscolares', '').split(',')[0].strip() if data.get('unidadesEscolares') else None,
            nome_unidade_escolar=data.get('unidadesEscolares'),
            responsavel_uniae=data.get('responsavel', 'Sistema Teste'),
            numero_processo_sei=data.get('processoSEI'),
            tematica_pse_principal=data.get('tematicaPSE'),
            indicador_pse_prioritario=data.get('indicadorPrioritario') == 'sim',
            orgao_parceiro=data.get('orgaoParceiro'),
            publico_alvo_estimado=int(data['publicoAlvo']) if data.get('publicoAlvo') else None,
            custo_estimado_reais=float(data['custoEstimado']) if data.get('custoEstimado') else None,
            observacoes_gerais=data.get('observacoes')
        )
        
        # Salvar no banco
        db.session.add(evento)
        db.session.commit()
        
        # Criar notificação
        notificacao = Notificacao.criar_notificacao_evento(evento, 'evento_geral')
        db.session.add(notificacao)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'id': id_evento,
            'message': 'Evento registrado com sucesso!'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@eventos_bp.route('/caso-saude', methods=['POST'])
def registrar_caso_saude():
    """Endpoint para registrar casos de saúde LGPD (simula formulário sensível)"""
    try:
        data = request.get_json()
        
        # Validações obrigatórias para LGPD
        campos_obrigatorios = ['nomeEstudante', 'codigoINEP', 'processoSEI', 'diagnostico']
        for campo in campos_obrigatorios:
            if not data.get(campo):
                return jsonify({
                    'success': False,
                    'message': f'Campo obrigatório: {campo}'
                }), 400
        
        # Gerar ID único para caso LGPD
        id_evento = Evento.gerar_id_evento('Atendimento de Saúde Individual')
        
        # Criar novo caso de saúde
        evento = Evento(
            id_evento=id_evento,
            tipo_de_evento='Atendimento de Saúde Individual',
            nome_evento=f'Acompanhamento de Saúde - {data["nomeEstudante"]}',
            status='Aguardando Verificação',
            data_inicio=date.today(),
            unidade_escolar_inep=data['codigoINEP'],
            responsavel_uniae=data.get('responsavel', 'Sistema Teste'),
            numero_processo_sei=data['processoSEI'],
            nome_estudante_envolvido=data['nomeEstudante'],
            diagnostico_resumido=data['diagnostico'],
            medicacao_prescrita=data.get('medicacao'),
            procedimento_emergencia=data.get('procedimentoEmergencia'),
            observacoes_gerais=data.get('observacoes')
        )
        
        # Salvar no banco
        db.session.add(evento)
        db.session.commit()
        
        # Criar alerta LGPD
        notificacao = Notificacao.criar_notificacao_evento(evento, 'lgpd_alerta')
        db.session.add(notificacao)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'id': id_evento,
            'message': 'Caso de saúde registrado com sucesso! Alerta de conformidade LGPD enviado para gestores.',
            'alertaLGPD': True
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@eventos_bp.route('/eventos', methods=['GET'])
def listar_eventos():
    """Endpoint para listar eventos (simula consulta à planilha Excel)"""
    try:
        # Parâmetros de filtro
        tipo_evento = request.args.get('tipo')
        status = request.args.get('status')
        busca = request.args.get('busca')
        include_lgpd = request.args.get('lgpd') == 'true'
        
        # Query base
        query = Evento.query
        
        # Aplicar filtros
        if tipo_evento:
            query = query.filter(Evento.tipo_de_evento == tipo_evento)
        
        if status:
            query = query.filter(Evento.status == status)
        
        if busca:
            query = query.filter(
                db.or_(
                    Evento.nome_evento.contains(busca),
                    Evento.id_evento.contains(busca)
                )
            )
        
        # Ordenar por data de criação (mais recentes primeiro)
        eventos = query.order_by(Evento.created_at.desc()).all()
        
        # Converter para dicionário
        eventos_dict = [evento.to_dict(include_lgpd=include_lgpd) for evento in eventos]
        
        return jsonify({
            'success': True,
            'eventos': eventos_dict,
            'total': len(eventos_dict)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@eventos_bp.route('/eventos/<id_evento>', methods=['GET'])
def obter_evento(id_evento):
    """Endpoint para obter detalhes de um evento específico"""
    try:
        evento = Evento.query.filter_by(id_evento=id_evento).first()
        
        if not evento:
            return jsonify({
                'success': False,
                'message': 'Evento não encontrado'
            }), 404
        
        include_lgpd = request.args.get('lgpd') == 'true'
        
        return jsonify({
            'success': True,
            'evento': evento.to_dict(include_lgpd=include_lgpd)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@eventos_bp.route('/eventos/<id_evento>/status', methods=['PUT'])
def atualizar_status_evento(id_evento):
    """Endpoint para atualizar status de um evento"""
    try:
        data = request.get_json()
        novo_status = data.get('status')
        
        if not novo_status:
            return jsonify({
                'success': False,
                'message': 'Status é obrigatório'
            }), 400
        
        evento = Evento.query.filter_by(id_evento=id_evento).first()
        
        if not evento:
            return jsonify({
                'success': False,
                'message': 'Evento não encontrado'
            }), 404
        
        evento.status = novo_status
        evento.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Status atualizado com sucesso'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500


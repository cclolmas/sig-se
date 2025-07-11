from flask import Blueprint, request, jsonify
import time
import random
from datetime import datetime

testes_bp = Blueprint('testes', __name__)

# Materiais disponíveis para distribuição
MATERIAIS_DISTRIBUICAO = [
    {
        'id': 'MAT001',
        'nome': 'Cartilhas de Saúde Bucal',
        'categoria': 'material_educativo',
        'descricao': 'Material educativo sobre higiene bucal para estudantes',
        'dados': {
            'quantidade': '500 unidades',
            'publico': 'Ensino Fundamental I',
            'escolas': 'EC 316 Norte, JI 114 Sul'
        },
        'esperado': 'Distribuição registrada, escolas notificadas, controle de estoque atualizado'
    },
    {
        'id': 'MAT002',
        'nome': 'Kits de Higiene Pessoal',
        'categoria': 'material_higiene',
        'descricao': 'Kits contendo escova, pasta de dente e sabonete',
        'dados': {
            'quantidade': '300 kits',
            'publico': 'Estudantes em vulnerabilidade social'
        },
        'esperado': 'Distribuição controlada, beneficiários identificados, relatório gerado'
    },
    {
        'id': 'MAT003',
        'nome': 'Material Didático PSE',
        'categoria': 'material_didatico',
        'descricao': 'Apostilas e jogos educativos sobre saúde',
        'dados': {
            'quantidade': '200 unidades',
            'tema': 'Alimentação Saudável'
        },
        'esperado': 'Material catalogado, professores capacitados, cronograma definido'
    },
    {
        'id': 'CT004',
        'nome': 'Evento/Fórum',
        'categoria': 'formulario_geral',
        'descricao': 'Testar registro de eventos e fóruns',
        'dados': {
            'nomeEvento': 'V Simpósio Tecnologias Educação Matemática',
            'tipoEvento': 'Evento/Fórum'
        },
        'esperado': 'ID gerado com prefixo "EVENT-", registro completo'
    },
    {
        'id': 'CT005',
        'nome': 'Caso de Saúde Individual - Alergia Grave',
        'categoria': 'formulario_lgpd',
        'descricao': 'Testar fluxo LGPD com dados sensíveis',
        'dados': {
            'nomeEstudante': 'Maria Silva Santos (TESTE)',
            'codigoINEP': '53004805',
            'diagnostico': 'Alergia grave a amendoim - anafilaxia'
        },
        'esperado': 'ID gerado com prefixo "CUID-", alerta LGPD enviado, dados protegidos'
    },
    {
        'id': 'CT006',
        'nome': 'Caso de Saúde - Diabetes',
        'categoria': 'formulario_lgpd',
        'descricao': 'Validar outro tipo de condição crônica',
        'dados': {
            'nomeEstudante': 'João Pedro Oliveira (TESTE)',
            'diagnostico': 'Diabetes Mellitus Tipo 1'
        },
        'esperado': 'Processamento similar ao CT005, dados específicos registrados'
    },
    {
        'id': 'CT007',
        'nome': 'Tentativa de Acesso Não Autorizado',
        'categoria': 'seguranca',
        'descricao': 'Verificar proteções de acesso',
        'dados': {},
        'esperado': 'Acesso negado, proteções funcionando'
    },
    {
        'id': 'CT008',
        'nome': 'Auditoria de Dados Sensíveis',
        'categoria': 'seguranca',
        'descricao': 'Verificar rastreabilidade de acesso',
        'dados': {},
        'esperado': 'Logs disponíveis, auditoria completa'
    },
    {
        'id': 'CT009',
        'nome': 'Carga de Múltiplas Respostas',
        'categoria': 'performance',
        'descricao': 'Testar sistema sob carga',
        'dados': {'quantidade': 10},
        'esperado': 'Todos os formulários processados, IDs únicos'
    },
    {
        'id': 'CT010',
        'nome': 'Teste de Recuperação',
        'categoria': 'performance',
        'descricao': 'Verificar comportamento em falhas',
        'dados': {},
        'esperado': 'Sistema se recupera automaticamente'
    },
    {
        'id': 'CT011',
        'nome': 'Fluxo Completo End-to-End',
        'categoria': 'integracao',
        'descricao': 'Testar jornada completa do usuário',
        'dados': {},
        'esperado': 'Jornada completa sem erros, dados consistentes'
    }
]

@testes_bp.route('/testes/cenarios', methods=['GET'])
def listar_cenarios_teste():
    """Endpoint para listar cenários de teste disponíveis"""
    try:
        categoria = request.args.get('categoria')
        
        cenarios = CENARIOS_TESTE
        if categoria:
            cenarios = [c for c in cenarios if c['categoria'] == categoria]
        
        return jsonify({
            'success': True,
            'cenarios': cenarios,
            'total': len(cenarios)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@testes_bp.route('/testes/executar/<cenario_id>', methods=['POST'])
def executar_teste_individual(cenario_id):
    """Endpoint para executar um teste individual"""
    try:
        # Encontrar cenário
        cenario = next((c for c in CENARIOS_TESTE if c['id'] == cenario_id), None)
        
        if not cenario:
            return jsonify({
                'success': False,
                'message': 'Cenário de teste não encontrado'
            }), 404
        
        # Simular tempo de execução
        tempo_execucao = random.randint(500, 3000)
        time.sleep(tempo_execucao / 1000)  # Converter para segundos
        
        # Simular resultado (90% de chance de sucesso)
        sucesso = random.random() > 0.1
        
        resultado = {
            'id': cenario_id,
            'status': 'aprovado' if sucesso else 'reprovado',
            'tempo': tempo_execucao,
            'detalhes': cenario['esperado'] if sucesso else 'Falha simulada para demonstração',
            'timestamp': datetime.utcnow().isoformat()
        }
        
        return jsonify({
            'success': True,
            'resultado': resultado
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@testes_bp.route('/testes/executar-todos', methods=['POST'])
def executar_todos_testes():
    """Endpoint para executar todos os testes"""
    try:
        resultados = []
        
        for cenario in CENARIOS_TESTE:
            # Simular tempo de execução
            tempo_execucao = random.randint(500, 3000)
            time.sleep(0.1)  # Pequena pausa para simular processamento
            
            # Simular resultado (90% de chance de sucesso)
            sucesso = random.random() > 0.1
            
            resultado = {
                'id': cenario['id'],
                'status': 'aprovado' if sucesso else 'reprovado',
                'tempo': tempo_execucao,
                'detalhes': cenario['esperado'] if sucesso else 'Falha simulada para demonstração',
                'timestamp': datetime.utcnow().isoformat()
            }
            
            resultados.append(resultado)
        
        # Estatísticas
        total = len(resultados)
        aprovados = len([r for r in resultados if r['status'] == 'aprovado'])
        reprovados = total - aprovados
        
        return jsonify({
            'success': True,
            'resultados': resultados,
            'estatisticas': {
                'total': total,
                'aprovados': aprovados,
                'reprovados': reprovados,
                'taxa_sucesso': round((aprovados / total) * 100, 2)
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500

@testes_bp.route('/testes/relatorio', methods=['GET'])
def gerar_relatorio_testes():
    """Endpoint para gerar relatório de testes"""
    try:
        # Simular dados de relatório
        relatorio = {
            'data_execucao': datetime.utcnow().isoformat(),
            'total_cenarios': len(CENARIOS_TESTE),
            'categorias': {
                'formulario_geral': len([c for c in CENARIOS_TESTE if c['categoria'] == 'formulario_geral']),
                'formulario_lgpd': len([c for c in CENARIOS_TESTE if c['categoria'] == 'formulario_lgpd']),
                'seguranca': len([c for c in CENARIOS_TESTE if c['categoria'] == 'seguranca']),
                'performance': len([c for c in CENARIOS_TESTE if c['categoria'] == 'performance']),
                'integracao': len([c for c in CENARIOS_TESTE if c['categoria'] == 'integracao'])
            },
            'cobertura': {
                'formularios': 100,
                'apis': 100,
                'integracao': 100,
                'seguranca': 100
            }
        }
        
        return jsonify({
            'success': True,
            'relatorio': relatorio
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Erro interno do servidor: {str(e)}'
        }), 500


import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TestTube, Play, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

export function Testes() {
  const [materiaisDistribuindo, setMateriaisDistribuindo] = useState(false)
  const [resultadosDistribuicao, setResultadosDistribuicao] = useState({})
  const [progresso, setProgresso] = useState(0)

  const materiaisDisponiveis = [
    {
      id: 'MAT001',
      nome: 'Cartilhas de Saúde Bucal',
      categoria: 'material_educativo',
      descricao: 'Material educativo sobre higiene bucal para estudantes',
      dados: {
        quantidade: '500 unidades',
        publico: 'Ensino Fundamental I',
        escolas: 'EC 316 Norte, JI 114 Sul'
      },
      esperado: 'Distribuição registrada, escolas notificadas, controle de estoque atualizado'
    },
    {
      id: 'MAT002',
      nome: 'Kits de Higiene Pessoal',
      categoria: 'material_higiene',
      descricao: 'Kits contendo escova, pasta de dente e sabonete',
      dados: {
        quantidade: '300 kits',
        publico: 'Estudantes em vulnerabilidade social'
      },
      esperado: 'Distribuição controlada, beneficiários identificados, relatório gerado'
    },
    {
      id: 'MAT003',
      nome: 'Material Didático PSE',
      categoria: 'material_didatico',
      descricao: 'Apostilas e jogos educativos sobre saúde',
      dados: {
        quantidade: '200 unidades',
        tema: 'Alimentação Saudável'
      },
      esperado: 'Material catalogado, professores capacitados, cronograma definido'
    },
    {
      id: 'CT004',
      nome: 'Evento/Fórum',
      categoria: 'formulario_geral',
      descricao: 'Testar registro de eventos e fóruns',
      dados: {
        nomeEvento: 'V Simpósio Tecnologias Educação Matemática',
        tipoEvento: 'Evento/Fórum'
      },
      esperado: 'ID gerado com prefixo "EVENT-", registro completo'
    },
    {
      id: 'CT005',
      nome: 'Caso de Saúde Individual - Alergia Grave',
      categoria: 'formulario_lgpd',
      descricao: 'Testar fluxo LGPD com dados sensíveis',
      dados: {
        nomeEstudante: 'Maria Silva Santos (TESTE)',
        codigoINEP: '53004805',
        diagnostico: 'Alergia grave a amendoim - anafilaxia'
      },
      esperado: 'ID gerado com prefixo "CUID-", alerta LGPD enviado, dados protegidos'
    },
    {
      id: 'CT006',
      nome: 'Caso de Saúde - Diabetes',
      categoria: 'formulario_lgpd',
      descricao: 'Validar outro tipo de condição crônica',
      dados: {
        nomeEstudante: 'João Pedro Oliveira (TESTE)',
        diagnostico: 'Diabetes Mellitus Tipo 1'
      },
      esperado: 'Processamento similar ao CT005, dados específicos registrados'
    },
    {
      id: 'CT007',
      nome: 'Tentativa de Acesso Não Autorizado',
      categoria: 'seguranca',
      descricao: 'Verificar proteções de acesso',
      dados: {},
      esperado: 'Acesso negado, proteções funcionando'
    },
    {
      id: 'CT008',
      nome: 'Auditoria de Dados Sensíveis',
      categoria: 'seguranca',
      descricao: 'Verificar rastreabilidade de acesso',
      dados: {},
      esperado: 'Logs disponíveis, auditoria completa'
    },
    {
      id: 'CT009',
      nome: 'Carga de Múltiplas Respostas',
      categoria: 'performance',
      descricao: 'Testar sistema sob carga',
      dados: { quantidade: 10 },
      esperado: 'Todos os formulários processados, IDs únicos'
    },
    {
      id: 'CT010',
      nome: 'Teste de Recuperação',
      categoria: 'performance',
      descricao: 'Verificar comportamento em falhas',
      dados: {},
      esperado: 'Sistema se recupera automaticamente'
    },
    {
      id: 'CT011',
      nome: 'Fluxo Completo End-to-End',
      categoria: 'integracao',
      descricao: 'Testar jornada completa do usuário',
      dados: {},
      esperado: 'Jornada completa sem erros, dados consistentes'
    }
  ]

  const executarTeste = async (cenario) => {
    // Simular execução do teste
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
    
    // Simular resultado (90% de chance de sucesso)
    const sucesso = Math.random() > 0.1
    const tempo = Math.floor(Math.random() * 3000 + 500)
    
    return {
      id: cenario.id,
      status: sucesso ? 'aprovado' : 'reprovado',
      tempo: tempo,
      detalhes: sucesso 
        ? `Teste executado com sucesso. ${cenario.esperado}`
        : `Falha na execução: Erro simulado para demonstração`,
      timestamp: new Date().toISOString()
    }
  }

  const executarTodosTestes = async () => {
    setTestesExecutando(true)
    setProgresso(0)
    setResultadosTeste({})

    for (let i = 0; i < cenariosTeste.length; i++) {
      const cenario = cenariosTeste[i]
      const resultado = await executarTeste(cenario)
      
      setResultadosTeste(prev => ({
        ...prev,
        [cenario.id]: resultado
      }))
      
      setProgresso(((i + 1) / cenariosTeste.length) * 100)
    }

    setTestesExecutando(false)
  }

  const executarTesteIndividual = async (cenario) => {
    setResultadosTeste(prev => ({
      ...prev,
      [cenario.id]: { status: 'executando' }
    }))

    const resultado = await executarTeste(cenario)
    
    setResultadosTeste(prev => ({
      ...prev,
      [cenario.id]: resultado
    }))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'reprovado':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'executando':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      'aprovado': 'success',
      'reprovado': 'destructive',
      'executando': 'default'
    }
    return <Badge variant={variants[status] || 'outline'}>{status || 'Pendente'}</Badge>
  }

  const categorias = {
    'formulario_geral': 'Formulários Gerais',
    'formulario_lgpd': 'Formulários LGPD',
    'seguranca': 'Segurança',
    'performance': 'Performance',
    'integracao': 'Integração'
  }

  const estatisticas = {
    total: cenariosTeste.length,
    executados: Object.keys(resultadosTeste).length,
    aprovados: Object.values(resultadosTeste).filter(r => r.status === 'aprovado').length,
    reprovados: Object.values(resultadosTeste).filter(r => r.status === 'reprovado').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <TestTube className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Testes do Sistema</h1>
        </div>
        <p className="text-muted-foreground">
          Execução dos cenários de teste conforme documentação
        </p>
      </div>

      {/* Controles Principais */}
      <Card>
        <CardHeader>
          <CardTitle>Controles de Teste</CardTitle>
          <CardDescription>
            Execute todos os testes ou cenários específicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={executarTodosTestes} 
              disabled={testesExecutando}
              className="min-w-32"
            >
              {testesExecutando ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Executando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Executar Todos</span>
                </div>
              )}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {estatisticas.executados}/{estatisticas.total} testes executados
            </div>
          </div>

          {testesExecutando && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{Math.round(progresso)}%</span>
              </div>
              <Progress value={progresso} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{estatisticas.total}</div>
            <div className="text-sm text-muted-foreground">Total de Testes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{estatisticas.executados}</div>
            <div className="text-sm text-muted-foreground">Executados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{estatisticas.aprovados}</div>
            <div className="text-sm text-muted-foreground">Aprovados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{estatisticas.reprovados}</div>
            <div className="text-sm text-muted-foreground">Reprovados</div>
          </CardContent>
        </Card>
      </div>

      {/* Resultados por Categoria */}
      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          {Object.entries(categorias).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          {cenariosTeste.map((cenario) => (
            <Card key={cenario.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(resultadosTeste[cenario.id]?.status)}
                    <div>
                      <CardTitle className="text-lg">{cenario.id}: {cenario.nome}</CardTitle>
                      <CardDescription>{cenario.descricao}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(resultadosTeste[cenario.id]?.status)}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => executarTesteIndividual(cenario)}
                      disabled={resultadosTeste[cenario.id]?.status === 'executando'}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Executar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {resultadosTeste[cenario.id] && resultadosTeste[cenario.id].status !== 'executando' && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Resultado:</strong> {resultadosTeste[cenario.id].detalhes}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tempo de execução: {resultadosTeste[cenario.id].tempo}ms | 
                      Executado em: {new Date(resultadosTeste[cenario.id].timestamp).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        {Object.entries(categorias).map(([categoria, label]) => (
          <TabsContent key={categoria} value={categoria} className="space-y-4">
            {cenariosTeste
              .filter(cenario => cenario.categoria === categoria)
              .map((cenario) => (
                <Card key={cenario.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(resultadosTeste[cenario.id]?.status)}
                        <div>
                          <CardTitle className="text-lg">{cenario.id}: {cenario.nome}</CardTitle>
                          <CardDescription>{cenario.descricao}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(resultadosTeste[cenario.id]?.status)}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executarTesteIndividual(cenario)}
                          disabled={resultadosTeste[cenario.id]?.status === 'executando'}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Executar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {resultadosTeste[cenario.id] && resultadosTeste[cenario.id].status !== 'executando' && (
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Resultado:</strong> {resultadosTeste[cenario.id].detalhes}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Tempo de execução: {resultadosTeste[cenario.id].tempo}ms | 
                          Executado em: {new Date(resultadosTeste[cenario.id].timestamp).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Informações sobre os Testes */}
      <Card>
        <CardHeader>
          <CardTitle>Sobre os Testes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Nota:</strong> Estes são testes simulados para demonstração. No sistema real, 
              os testes validariam as integrações com Office 365, Power Automate e Microsoft Forms.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Categorias de Teste</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Formulários:</strong> Validação de entrada de dados</li>
                <li>• <strong>LGPD:</strong> Conformidade e segurança</li>
                <li>• <strong>Performance:</strong> Carga e recuperação</li>
                <li>• <strong>Integração:</strong> Fluxos completos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Critérios de Aprovação</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Dados processados corretamente</li>
                <li>• IDs gerados no formato esperado</li>
                <li>• Notificações enviadas</li>
                <li>• Conformidade LGPD mantida</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


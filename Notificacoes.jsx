import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, AlertTriangle, CheckCircle, Clock, ExternalLink, Shield, RefreshCw } from 'lucide-react'

export function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([])
  const [carregando, setCarregando] = useState(false)

  // Notificações simuladas
  const notificacoesSimuladas = [
    {
      id: 'notif-001',
      tipo: 'evento_geral',
      titulo: 'Novo evento registrado',
      mensagem: 'Campanha Saúde Bucal 2025 foi registrada por Maria Silva',
      timestamp: '2025-05-24T14:30:15Z',
      lida: false,
      prioridade: 'normal',
      dados: {
        id_evento: 'PSE-20250524-143015',
        tipo_evento: 'Ação Coletiva PSE',
        responsavel: 'Maria Silva'
      }
    },
    {
      id: 'notif-002',
      tipo: 'lgpd_alerta',
      titulo: 'ALERTA DE CONFORMIDADE (LGPD)',
      mensagem: 'Novo caso de saúde sensível requer verificação imediata',
      timestamp: '2025-05-24T14:45:30Z',
      lida: false,
      prioridade: 'alta',
      dados: {
        id_evento: 'CUID-20250524-144530',
        estudante: '*** DADOS PROTEGIDOS ***',
        processo_sei: '00080-00039018/2025-25',
        responsavel: 'João Santos'
      }
    },
    {
      id: 'notif-003',
      tipo: 'evento_geral',
      titulo: 'Campanha atualizada',
      mensagem: 'Vacinação HPV - Adolescentes teve resultados atualizados',
      timestamp: '2025-05-24T15:00:00Z',
      lida: true,
      prioridade: 'normal',
      dados: {
        id_evento: 'CAMP-20250524-150000',
        tipo_evento: 'Campanha de Saúde Específica',
        responsavel: 'Ana Costa'
      }
    }
  ]

  useEffect(() => {
    carregarNotificacoes()
  }, [])

  const carregarNotificacoes = async () => {
    setCarregando(true)
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    setNotificacoes(notificacoesSimuladas)
    setCarregando(false)
  }

  const marcarComoLida = (id) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lida: true } : notif
      )
    )
  }

  const formatarData = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR')
  }

  const getPrioridadeIcon = (prioridade) => {
    switch (prioridade) {
      case 'alta':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'normal':
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPrioridadeBadge = (prioridade) => {
    const variants = {
      'alta': 'destructive',
      'normal': 'default',
      'baixa': 'secondary'
    }
    return <Badge variant={variants[prioridade]}>{prioridade.toUpperCase()}</Badge>
  }

  const renderCartaoLGPD = (notificacao) => (
    <Card className="border-red-500 bg-red-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-800">{notificacao.titulo}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {getPrioridadeBadge(notificacao.prioridade)}
            {!notificacao.lida && <Badge variant="outline">Nova</Badge>}
          </div>
        </div>
        <CardDescription className="text-red-700">
          {notificacao.mensagem}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>ID do Evento:</strong> {notificacao.dados.id_evento}
          </div>
          <div>
            <strong>Processo SEI:</strong> {notificacao.dados.processo_sei}
          </div>
          <div>
            <strong>Registrado por:</strong> {notificacao.dados.responsavel}
          </div>
          <div>
            <strong>Data/Hora:</strong> {formatarData(notificacao.timestamp)}
          </div>
        </div>
        
        <Alert className="border-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Ação Necessária:</strong> Verificar documentação no processo SEI e validar conformidade LGPD antes de prosseguir.
          </AlertDescription>
        </Alert>

        <div className="flex space-x-2">
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            <ExternalLink className="h-4 w-4 mr-1" />
            Verificar Processo no SEI
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => marcarComoLida(notificacao.id)}
            disabled={notificacao.lida}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            {notificacao.lida ? 'Verificado' : 'Marcar como Verificado'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCartaoGeral = (notificacao) => (
    <Card className={notificacao.lida ? 'opacity-75' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getPrioridadeIcon(notificacao.prioridade)}
            <CardTitle>{notificacao.titulo}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {getPrioridadeBadge(notificacao.prioridade)}
            {!notificacao.lida && <Badge variant="outline">Nova</Badge>}
          </div>
        </div>
        <CardDescription>
          {notificacao.mensagem}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>ID do Evento:</strong> {notificacao.dados.id_evento}
          </div>
          <div>
            <strong>Tipo:</strong> {notificacao.dados.tipo_evento}
          </div>
          <div>
            <strong>Responsável:</strong> {notificacao.dados.responsavel}
          </div>
          <div>
            <strong>Data/Hora:</strong> {formatarData(notificacao.timestamp)}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-1" />
            Ver Detalhes
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => marcarComoLida(notificacao.id)}
            disabled={notificacao.lida}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            {notificacao.lida ? 'Lida' : 'Marcar como Lida'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const naoLidas = notificacoes.filter(n => !n.lida).length
  const alertasLGPD = notificacoes.filter(n => n.tipo === 'lgpd_alerta' && !n.lida).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Bell className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Notificações</h1>
        </div>
        <p className="text-muted-foreground">
          Simulação das notificações do Microsoft Teams
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{notificacoes.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{naoLidas}</div>
            <div className="text-sm text-muted-foreground">Não Lidas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{alertasLGPD}</div>
            <div className="text-sm text-muted-foreground">Alertas LGPD</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-center">
            <Button onClick={carregarNotificacoes} variant="outline" disabled={carregando}>
              <RefreshCw className={`h-4 w-4 mr-2 ${carregando ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Importantes */}
      {alertasLGPD > 0 && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Atenção:</strong> Existem {alertasLGPD} alerta(s) de conformidade LGPD pendente(s) que requerem verificação imediata.
          </AlertDescription>
        </Alert>
      )}

      {/* Lista de Notificações */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Todas as Notificações ({notificacoes.length})
          </h2>
          <div className="flex space-x-2">
            <Badge variant="outline">
              {naoLidas} não lidas
            </Badge>
          </div>
        </div>

        {carregando ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Carregando notificações...</span>
          </div>
        ) : notificacoes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma notificação encontrada</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notificacoes
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((notificacao) => (
                <div key={notificacao.id}>
                  {notificacao.tipo === 'lgpd_alerta' 
                    ? renderCartaoLGPD(notificacao)
                    : renderCartaoGeral(notificacao)
                  }
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Informações sobre Notificações */}
      <Card>
        <CardHeader>
          <CardTitle>Sobre as Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Tipos de Notificação</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Evento Geral:</strong> Novos registros de eventos</li>
                <li>• <strong>Alerta LGPD:</strong> Casos sensíveis que requerem verificação</li>
                <li>• <strong>Atualizações:</strong> Mudanças de status ou resultados</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Prioridades</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Alta:</strong> Requer ação imediata (LGPD)</li>
                <li>• <strong>Normal:</strong> Informativa, ação opcional</li>
                <li>• <strong>Baixa:</strong> Apenas para conhecimento</li>
              </ul>
            </div>
          </div>
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              No sistema real, essas notificações seriam enviadas automaticamente para o Microsoft Teams 
              através dos fluxos do Power Automate, garantindo que a equipe seja informada em tempo real.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}


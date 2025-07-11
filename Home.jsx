import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Heart, 
  Database, 
  Bell, 
  TestTube,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle
} from 'lucide-react'

export function Home() {
  const stats = [
    { label: 'Total de Eventos', value: '0', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Casos LGPD', value: '0', icon: Heart, color: 'bg-red-500' },
    { label: 'Notificações', value: '0', icon: Bell, color: 'bg-yellow-500' },
    { label: 'Materiais Distribuídos', value: '0', icon: TestTube, color: 'bg-green-500' },
  ]

  const quickActions = [
    {
      title: 'Registrar Evento Geral',
      description: 'Cadastrar ações coletivas, campanhas e eventos',
      icon: FileText,
      path: '/evento-geral',
      color: 'text-blue-600'
    },
    {
      title: 'Registrar Caso de Saúde',
      description: 'Dados sensíveis com conformidade LGPD',
      icon: Heart,
      path: '/caso-saude',
      color: 'text-red-600'
    },
    {
      title: 'Visualizar Dados',
      description: 'Consultar planilha de monitoramento',
      icon: Database,
      path: '/dados',
      color: 'text-green-600'
    },
    {
      title: 'Controle de Distribuição de Materiais',
      description: 'Gerenciar distribuição de materiais educacionais',
      icon: TestTube,
      path: '/testes',
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          SIG-SE
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interface de teste para simular as funcionalidades do sistema de monitoramento 
          de eventos de saúde e apoio escolar da CRE Plano Piloto/Cruzeiro
        </p>
        <Badge variant="outline" className="text-sm">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Ambiente de Teste - Dados Simulados
        </Badge>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                Dados em tempo real
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ações Rápidas */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <action.icon className={`h-8 w-8 ${action.color}`} />
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={action.path}>
                    Acessar
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Informações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Sobre o Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Formulários</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Registro de Eventos Gerais</li>
                <li>• Casos de Saúde (LGPD)</li>
                <li>• Validação automática</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Processamento</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Geração automática de IDs</li>
                <li>• Roteamento por tipo</li>
                <li>• Notificações em tempo real</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Conformidade</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Proteção de dados LGPD</li>
                <li>• Auditoria de acesso</li>
                <li>• Alertas de segurança</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


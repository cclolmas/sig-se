import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Database, Search, Filter, Download, Eye, EyeOff, RefreshCw } from 'lucide-react'

export function Dados() {
  const [dados, setDados] = useState([])
  const [filtros, setFiltros] = useState({
    busca: '',
    tipoEvento: '',
    status: ''
  })
  const [mostrarDadosLGPD, setMostrarDadosLGPD] = useState(false)
  const [carregando, setCarregando] = useState(false)

  // Dados simulados
  const dadosSimulados = [
    {
      ID_Evento: 'PSE-20250524-143015',
      Tipo_de_Evento: 'Ação Coletiva PSE',
      Nome_Evento: 'Campanha Saúde Bucal 2025',
      Status: 'Planejado',
      Data_Inicio: '2025-05-31',
      Data_Fim: null,
      Unidade_Escolar_INEP: '53004805',
      Nome_Unidade_Escolar: 'EC 316 Norte',
      Responsavel_UNIAE: 'Maria Silva',
      Numero_Processo_SEI: '00080-00039017/2025-25',
      Tematica_PSE_Principal: 'Saúde Bucal',
      Indicador_PSE_Prioritario: 'Sim',
      Orgao_Parceiro: 'UBS 01 Asa Norte',
      Publico_Alvo_Estimado: 500,
      Resultado_Alcancado: null,
      Nome_Estudante_Envolvido: null,
      Diagnostico_Resumido: null,
      Medicacao_Prescrita: null,
      Procedimento_Emergencia: null,
      Comparecimento_Consulta: null,
      Motivo_Falta_Registrado: null,
      Custo_Estimado_Reais: 1500.00,
      Avaliacao_Qualitativa: null,
      Observacoes_Gerais: 'Evento planejado para todas as turmas'
    },
    {
      ID_Evento: 'CUID-20250524-144530',
      Tipo_de_Evento: 'Atendimento de Saúde Individual',
      Nome_Evento: 'Acompanhamento Alergia Grave - JI 114 Sul',
      Status: 'Aguardando Verificação',
      Data_Inicio: '2025-05-24',
      Data_Fim: null,
      Unidade_Escolar_INEP: '53004806',
      Nome_Unidade_Escolar: 'JI 114 Sul',
      Responsavel_UNIAE: 'João Santos',
      Numero_Processo_SEI: '00080-00039018/2025-25',
      Tematica_PSE_Principal: null,
      Indicador_PSE_Prioritario: null,
      Orgao_Parceiro: null,
      Publico_Alvo_Estimado: null,
      Resultado_Alcancado: null,
      Nome_Estudante_Envolvido: '*** DADOS PROTEGIDOS ***',
      Diagnostico_Resumido: '*** DADOS PROTEGIDOS ***',
      Medicacao_Prescrita: '*** DADOS PROTEGIDOS ***',
      Procedimento_Emergencia: '*** DADOS PROTEGIDOS ***',
      Comparecimento_Consulta: null,
      Motivo_Falta_Registrado: null,
      Custo_Estimado_Reais: null,
      Avaliacao_Qualitativa: null,
      Observacoes_Gerais: 'Caso sensível - acesso restrito'
    },
    {
      ID_Evento: 'CAMP-20250524-150000',
      Tipo_de_Evento: 'Campanha de Saúde Específica',
      Nome_Evento: 'Vacinação HPV - Adolescentes',
      Status: 'Em Andamento',
      Data_Inicio: '2025-05-20',
      Data_Fim: '2025-06-15',
      Unidade_Escolar_INEP: '53004807',
      Nome_Unidade_Escolar: 'CEM 01 Asa Norte',
      Responsavel_UNIAE: 'Ana Costa',
      Numero_Processo_SEI: '00080-00039019/2025-25',
      Tematica_PSE_Principal: 'Verificação da Situação Vacinal',
      Indicador_PSE_Prioritario: 'Sim',
      Orgao_Parceiro: 'SES-DF',
      Publico_Alvo_Estimado: 800,
      Resultado_Alcancado: 450,
      Nome_Estudante_Envolvido: null,
      Diagnostico_Resumido: null,
      Medicacao_Prescrita: null,
      Procedimento_Emergencia: null,
      Comparecimento_Consulta: null,
      Motivo_Falta_Registrado: null,
      Custo_Estimado_Reais: 2500.00,
      Avaliacao_Qualitativa: 'Boa adesão inicial',
      Observacoes_Gerais: 'Campanha em andamento conforme cronograma'
    }
  ]

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setCarregando(true)
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDados(dadosSimulados)
    setCarregando(false)
  }

  const dadosFiltrados = dados.filter(item => {
    const matchBusca = !filtros.busca || 
      item.Nome_Evento.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      item.ID_Evento.toLowerCase().includes(filtros.busca.toLowerCase())
    
    const matchTipo = !filtros.tipoEvento || item.Tipo_de_Evento === filtros.tipoEvento
    const matchStatus = !filtros.status || item.Status === filtros.status

    return matchBusca && matchTipo && matchStatus
  })

  const getStatusBadge = (status) => {
    const variants = {
      'Planejado': 'secondary',
      'Em Andamento': 'default',
      'Concluído': 'success',
      'Aguardando Verificação': 'destructive'
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  const exportarDados = () => {
    const csv = [
      Object.keys(dadosFiltrados[0] || {}),
      ...dadosFiltrados.map(item => Object.values(item))
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dados_uniae.csv'
    a.click()
  }

  const camposVisiveis = [
    'ID_Evento',
    'Tipo_de_Evento', 
    'Nome_Evento',
    'Status',
    'Data_Inicio',
    'Unidade_Escolar_INEP',
    'Nome_Unidade_Escolar',
    'Responsavel_UNIAE',
    'Numero_Processo_SEI'
  ]

  const camposLGPD = [
    'Nome_Estudante_Envolvido',
    'Diagnostico_Resumido',
    'Medicacao_Prescrita',
    'Procedimento_Emergencia'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Dados do Sistema</h1>
        </div>
        <p className="text-muted-foreground">
          Visualização da planilha de monitoramento UNIAE (24 colunas)
        </p>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Controles</CardTitle>
          <CardDescription>
            Filtrar e exportar dados do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nome ou ID do evento..."
                  value={filtros.busca}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Evento</label>
              <Select value={filtros.tipoEvento} onValueChange={(value) => setFiltros(prev => ({ ...prev, tipoEvento: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="Ação Coletiva PSE">Ação Coletiva PSE</SelectItem>
                  <SelectItem value="Campanha de Saúde Específica">Campanha de Saúde Específica</SelectItem>
                  <SelectItem value="Demanda Administrativa">Demanda Administrativa</SelectItem>
                  <SelectItem value="Evento/Fórum">Evento/Fórum</SelectItem>
                  <SelectItem value="Atendimento de Saúde Individual">Atendimento de Saúde Individual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="Planejado">Planejado</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Aguardando Verificação">Aguardando Verificação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ações</label>
              <div className="flex space-x-2">
                <Button onClick={carregarDados} variant="outline" size="sm" disabled={carregando}>
                  <RefreshCw className={`h-4 w-4 ${carregando ? 'animate-spin' : ''}`} />
                </Button>
                <Button onClick={exportarDados} variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={mostrarDadosLGPD ? "destructive" : "outline"}
              size="sm"
              onClick={() => setMostrarDadosLGPD(!mostrarDadosLGPD)}
            >
              {mostrarDadosLGPD ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {mostrarDadosLGPD ? 'Ocultar' : 'Mostrar'} Dados LGPD
            </Button>
            {mostrarDadosLGPD && (
              <Badge variant="destructive">
                Dados sensíveis visíveis - Acesso auditado
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{dadosFiltrados.length}</div>
            <div className="text-sm text-muted-foreground">Total de Registros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {dadosFiltrados.filter(d => d.Tipo_de_Evento === 'Atendimento de Saúde Individual').length}
            </div>
            <div className="text-sm text-muted-foreground">Casos LGPD</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {dadosFiltrados.filter(d => d.Status === 'Em Andamento').length}
            </div>
            <div className="text-sm text-muted-foreground">Em Andamento</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {dadosFiltrados.filter(d => d.Indicador_PSE_Prioritario === 'Sim').length}
            </div>
            <div className="text-sm text-muted-foreground">PSE Prioritário</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Planilha de Monitoramento</CardTitle>
          <CardDescription>
            Dados estruturados conforme modelo de 24 colunas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {carregando ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Carregando dados...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {camposVisiveis.map(campo => (
                      <TableHead key={campo} className="whitespace-nowrap">
                        {campo.replace(/_/g, ' ')}
                      </TableHead>
                    ))}
                    {mostrarDadosLGPD && camposLGPD.map(campo => (
                      <TableHead key={campo} className="whitespace-nowrap bg-red-50 text-red-800">
                        {campo.replace(/_/g, ' ')} (LGPD)
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFiltrados.map((item, index) => (
                    <TableRow key={index}>
                      {camposVisiveis.map(campo => (
                        <TableCell key={campo} className="whitespace-nowrap">
                          {campo === 'Status' ? getStatusBadge(item[campo]) : 
                           campo === 'Indicador_PSE_Prioritario' && item[campo] === 'Sim' ? 
                           <Badge variant="success">Sim</Badge> :
                           item[campo] || '-'}
                        </TableCell>
                      ))}
                      {mostrarDadosLGPD && camposLGPD.map(campo => (
                        <TableCell key={campo} className="whitespace-nowrap bg-red-50">
                          {item[campo] === '*** DADOS PROTEGIDOS ***' ? (
                            <Badge variant="destructive">Protegido</Badge>
                          ) : (
                            item[campo] || '-'
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


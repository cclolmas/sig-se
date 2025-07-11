import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function EventoGeral() {
  const [formData, setFormData] = useState({
    nomeEvento: '',
    dataInicio: '',
    tipoEvento: '',
    unidadesEscolares: '',
    processoSEI: '',
    tematicaPSE: '',
    indicadorPrioritario: '',
    orgaoParceiro: '',
    publicoAlvo: '',
    custoEstimado: '',
    observacoes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const tiposEvento = [
    'Ação Coletiva PSE',
    'Campanha de Saúde Específica',
    'Demanda Administrativa',
    'Evento/Fórum'
  ]

  const tematicasPSE = [
    'Saúde Bucal',
    'Saúde Ocular',
    'Saúde Auditiva',
    'Saúde Sexual e Reprodutiva',
    'Verificação da Situação Vacinal',
    'Saúde Ambiental',
    'Promoção da Cultura de Paz e Direitos Humanos',
    'Prevenção ao Uso de Álcool, Tabaco e Outras Drogas',
    'Promoção da Alimentação Saudável',
    'Promoção da Atividade Física',
    'Prevenção da Obesidade',
    'Saúde Mental',
    'Prevenção de Acidentes e Violências',
    'Identificação de Sinais de Agravos de Doenças em Eliminação'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular resposta da API
      const response = {
        success: true,
        id: `${formData.tipoEvento === 'Ação Coletiva PSE' ? 'PSE' : 
             formData.tipoEvento === 'Campanha de Saúde Específica' ? 'CAMP' :
             formData.tipoEvento === 'Demanda Administrativa' ? 'ADM' : 'EVENT'}-${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
        message: 'Evento registrado com sucesso!'
      }

      setSubmitResult(response)
      
      // Limpar formulário após sucesso
      if (response.success) {
        setFormData({
          nomeEvento: '',
          dataInicio: '',
          tipoEvento: '',
          unidadesEscolares: '',
          processoSEI: '',
          tematicaPSE: '',
          indicadorPrioritario: '',
          orgaoParceiro: '',
          publicoAlvo: '',
          custoEstimado: '',
          observacoes: ''
        })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Erro ao registrar evento. Tente novamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Registro de Evento SIG-SE</h1>
        </div>
        <p className="text-muted-foreground">
          Formulário para registro de ações coletivas, campanhas e eventos do SIG-SE/CRE-PP
        </p>
        <Badge variant="outline">Formulário Geral - Dados Não Sensíveis</Badge>
      </div>

      {/* Resultado do envio */}
      {submitResult && (
        <Alert className={submitResult.success ? "border-green-500" : "border-red-500"}>
          {submitResult.success ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription>
            {submitResult.message}
            {submitResult.success && submitResult.id && (
              <div className="mt-2 font-mono text-sm bg-muted p-2 rounded">
                ID gerado: {submitResult.id}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Dados do Evento</CardTitle>
          <CardDescription>
            Preencha as informações básicas do evento ou ação a ser registrada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeEvento">Nome do Evento *</Label>
                <Input
                  id="nomeEvento"
                  value={formData.nomeEvento}
                  onChange={(e) => handleInputChange('nomeEvento', e.target.value)}
                  placeholder="Ex: Campanha Saúde Bucal 2025"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data Prevista de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoEvento">Tipo de Evento *</Label>
              <Select value={formData.tipoEvento} onValueChange={(value) => handleInputChange('tipoEvento', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de evento" />
                </SelectTrigger>
                <SelectContent>
                  {tiposEvento.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unidadesEscolares">Unidade(s) Escolar(es) Envolvida(s)</Label>
              <Textarea
                id="unidadesEscolares"
                value={formData.unidadesEscolares}
                onChange={(e) => handleInputChange('unidadesEscolares', e.target.value)}
                placeholder="Ex: EC 316 Norte, JI 114 Sul (separar por vírgula)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="processoSEI">Número do Processo SEI</Label>
              <Input
                id="processoSEI"
                value={formData.processoSEI}
                onChange={(e) => handleInputChange('processoSEI', e.target.value)}
                placeholder="Ex: 00080-00039017/2025-25"
              />
            </div>

            {/* Campos específicos para PSE */}
            {formData.tipoEvento === 'Ação Coletiva PSE' && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg">Informações Específicas do PSE</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="tematicaPSE">Temática PSE Principal</Label>
                  <Select value={formData.tematicaPSE} onValueChange={(value) => handleInputChange('tematicaPSE', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a temática" />
                    </SelectTrigger>
                    <SelectContent>
                      {tematicasPSE.map((tematica) => (
                        <SelectItem key={tematica} value={tematica}>
                          {tematica}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="indicadorPrioritario">Atende a Indicador Prioritário do Ciclo 2025/2026?</Label>
                  <Select value={formData.indicadorPrioritario} onValueChange={(value) => handleInputChange('indicadorPrioritario', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Informações Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgaoParceiro">Órgão Parceiro</Label>
                <Input
                  id="orgaoParceiro"
                  value={formData.orgaoParceiro}
                  onChange={(e) => handleInputChange('orgaoParceiro', e.target.value)}
                  placeholder="Ex: UBS 01 Asa Norte"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicoAlvo">Público Alvo Estimado</Label>
                <Input
                  id="publicoAlvo"
                  type="number"
                  value={formData.publicoAlvo}
                  onChange={(e) => handleInputChange('publicoAlvo', e.target.value)}
                  placeholder="Ex: 500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custoEstimado">Custo Estimado (R$)</Label>
              <Input
                id="custoEstimado"
                type="number"
                step="0.01"
                value={formData.custoEstimado}
                onChange={(e) => handleInputChange('custoEstimado', e.target.value)}
                placeholder="Ex: 1500.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações Gerais</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Informações adicionais relevantes..."
                rows={4}
              />
            </div>

            {/* Botão de envio */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || !formData.nomeEvento || !formData.tipoEvento}
                className="min-w-32"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Registrar Evento</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


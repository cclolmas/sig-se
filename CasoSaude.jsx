import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Send, CheckCircle, AlertCircle, Shield, Lock } from 'lucide-react'

export function CasoSaude() {
  const [formData, setFormData] = useState({
    nomeEstudante: '',
    codigoINEP: '',
    processoSEI: '',
    diagnostico: '',
    medicacao: '',
    procedimentoEmergencia: '',
    observacoes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)
  const [consentimento, setConsentimento] = useState(false)

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
        id: `CUID-${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}`,
        message: 'Caso de saúde registrado com sucesso! Alerta de conformidade LGPD enviado para gestores.',
        alertaLGPD: true
      }

      setSubmitResult(response)
      
      // Limpar formulário após sucesso
      if (response.success) {
        setFormData({
          nomeEstudante: '',
          codigoINEP: '',
          processoSEI: '',
          diagnostico: '',
          medicacao: '',
          procedimentoEmergencia: '',
          observacoes: ''
        })
        setConsentimento(false)
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Erro ao registrar caso de saúde. Tente novamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com avisos de segurança */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold">Registro de Atendimento Individual de Saúde</h1>
        </div>
        <Badge variant="destructive" className="text-sm">
          <Shield className="h-4 w-4 mr-1" />
          CONFIDENCIAL - DADOS SENSÍVEIS LGPD
        </Badge>
      </div>

      {/* Avisos de Conformidade */}
      <Alert className="border-red-500 bg-red-50">
        <Lock className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>IMPORTANTE:</strong> Este formulário destina-se exclusivamente à equipe autorizada da UNIAE. 
          Preencher apenas com base em laudo médico oficial e autorização expressa dos pais/responsáveis. 
          Todos os acessos são auditados conforme LGPD.
        </AlertDescription>
      </Alert>

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
              <div className="mt-2 space-y-2">
                <div className="font-mono text-sm bg-muted p-2 rounded">
                  ID gerado: {submitResult.id}
                </div>
                {submitResult.alertaLGPD && (
                  <div className="text-sm text-orange-700 bg-orange-50 p-2 rounded border border-orange-200">
                    🔔 Notificação de conformidade enviada para gestores autorizados
                  </div>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Dados do Estudante</span>
          </CardTitle>
          <CardDescription>
            Informações de saúde sensíveis - Uso restrito e auditado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identificação do Estudante */}
            <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-lg text-red-800">Identificação</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeEstudante">Nome Completo do Estudante *</Label>
                  <Input
                    id="nomeEstudante"
                    value={formData.nomeEstudante}
                    onChange={(e) => handleInputChange('nomeEstudante', e.target.value)}
                    placeholder="Nome completo conforme documentos"
                    required
                    className="border-red-300 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codigoINEP">Código INEP da Unidade Escolar *</Label>
                  <Input
                    id="codigoINEP"
                    value={formData.codigoINEP}
                    onChange={(e) => handleInputChange('codigoINEP', e.target.value)}
                    placeholder="Ex: 53004805"
                    required
                    className="border-red-300 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="processoSEI">Número do Processo SEI com Documentação Comprobatória *</Label>
                <Input
                  id="processoSEI"
                  value={formData.processoSEI}
                  onChange={(e) => handleInputChange('processoSEI', e.target.value)}
                  placeholder="Ex: 00080-00039017/2025-25"
                  required
                  className="border-red-300 focus:border-red-500"
                />
                <p className="text-xs text-red-600">
                  Obrigatório: Laudo médico e autorização dos responsáveis devem estar anexados ao processo
                </p>
              </div>
            </div>

            {/* Informações Médicas */}
            <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-lg text-orange-800">Informações Médicas</h3>
              
              <div className="space-y-2">
                <Label htmlFor="diagnostico">Diagnóstico Resumido e Procedimentos Necessários *</Label>
                <Textarea
                  id="diagnostico"
                  value={formData.diagnostico}
                  onChange={(e) => handleInputChange('diagnostico', e.target.value)}
                  placeholder="Conforme laudo médico: diagnóstico, procedimentos, cuidados especiais..."
                  rows={4}
                  required
                  className="border-orange-300 focus:border-orange-500"
                />
                <p className="text-xs text-orange-600">
                  Transcrever apenas informações essenciais do laudo médico oficial
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicacao">Medicação Prescrita</Label>
                <Textarea
                  id="medicacao"
                  value={formData.medicacao}
                  onChange={(e) => handleInputChange('medicacao', e.target.value)}
                  placeholder="Nome, dosagem, frequência e instruções especiais..."
                  rows={3}
                  className="border-orange-300 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedimentoEmergencia">Instruções para Procedimento de Emergência</Label>
                <Textarea
                  id="procedimentoEmergencia"
                  value={formData.procedimentoEmergencia}
                  onChange={(e) => handleInputChange('procedimentoEmergencia', e.target.value)}
                  placeholder="Passos detalhados em caso de emergência, contatos, medicamentos de urgência..."
                  rows={4}
                  className="border-orange-300 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações Adicionais</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Informações complementares relevantes para o acompanhamento..."
                rows={3}
              />
            </div>

            {/* Consentimento */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consentimento"
                  checked={consentimento}
                  onCheckedChange={setConsentimento}
                />
                <div className="space-y-1">
                  <Label htmlFor="consentimento" className="text-sm font-medium">
                    Declaração de Conformidade LGPD
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Declaro que possuo autorização expressa dos pais/responsáveis para o tratamento destes dados 
                    de saúde, conforme documentação anexada ao processo SEI informado. Estou ciente de que este 
                    registro será auditado e que o acesso indevido a dados sensíveis constitui infração à LGPD.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de envio */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || !formData.nomeEstudante || !formData.codigoINEP || !formData.processoSEI || !formData.diagnostico || !consentimento}
                className="min-w-32 bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Registrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Registrar Caso</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Informações de Segurança */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Informações de Segurança</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-blue-700">
          <p>• Todos os dados são criptografados e armazenados com segurança</p>
          <p>• Acesso restrito apenas à equipe autorizada da UNIAE</p>
          <p>• Logs de auditoria registram todos os acessos e modificações</p>
          <p>• Dados são mantidos apenas pelo tempo necessário ao atendimento</p>
          <p>• Em caso de dúvidas sobre LGPD, contate o DPO da SEEDF</p>
        </CardContent>
      </Card>
    </div>
  )
}


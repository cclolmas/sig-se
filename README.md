# SIG-SE: Próximos Passos para Integração Office 365

https://lnh8imcjy1x0.manus.space

Este projeto prototipa funcionalidades para monitoramento e gestão de eventos e casos de saúde escolar, com foco em integração nativa ao Office 365 (Forms, Excel/Sheets, Power Automate e Teams).

## Visão Geral
- **Planilha Central (Excel Online/SharePoint):** Banco de dados estruturado (`tblEventos`)
- **Microsoft Forms:** Interface de entrada de dados (eventos gerais e casos de saúde)
- **Power Automate:** Automação dos fluxos (registro, triagem, notificações, conformidade LGPD)
- **Teams:** Notificações e alertas para a equipe

## Próximos Passos

### 1. Estruturar os Ativos no Office 365
- [ ] **Criar Planilha Central** no SharePoint/OneDrive, nomeando a tabela como `tblEventos` (ver dicionário de dados no README/Guia).
- [ ] **Criar Formulários no Microsoft Forms**:
  - Formulário Geral de Eventos
  - Formulário de Casos de Saúde (LGPD)
- [ ] **Configurar Permissões** (acesso restrito para dados sensíveis)

### 2. Implementar Fluxos de Automação (Power Automate)
- [ ] **Fluxo 1:** Registro e triagem de eventos gerais
- [ ] **Fluxo 2:** Gestão de casos de saúde sensíveis (LGPD)
- [ ] **Mapeamento de campos**: Garantir correspondência entre perguntas dos Forms e colunas da planilha
- [ ] **Notificações Teams:** Configurar cartões adaptáveis para alertas críticos

### 3. Testes e Validação
- [ ] Testar envio de formulários e checar inserção automática na planilha
- [ ] Validar notificações no Teams
- [ ] Testar cenários de erro (permissão, campos obrigatórios, etc.)
- [ ] Garantir conformidade LGPD (dados sensíveis, logs, auditoria)

### 4. Refinamento e Qualidade
- [ ] Revisar nomenclatura de campos e perguntas
- [ ] Adotar princípios de design (Material UI: clareza, hierarquia, feedback)
- [ ] Documentar fluxos e pontos críticos

## Como Pensar as Funcionalidades Prototipadas
- **Separação de fluxos:** Eventos gerais e casos de saúde sensíveis devem ter formulários e automações distintas
- **Automação ponta a ponta:** Submissão do Forms → Power Automate → Planilha → Notificação Teams
- **Escalabilidade:** Estruturar para fácil replicação em outros contextos escolares
- **Segurança:** Dados sensíveis apenas em canais privados e com acesso restrito

## Referências e Documentação
- [Guia de Implementação Técnica](office/Guia_Implementacao_Sistema_UNIAE.md)
- [Cenários de Teste](office/Cenarios_Teste_UNIAE.md)
- [Guia de Solução de Problemas](office/Guia_Solucao_Problemas_UNIAE.md)
- [Checklist de Implementação](office/Checklist_Implementacao_UNIAE.md)

## Links Úteis
- [Power Automate](https://flow.microsoft.com)
- [Microsoft Forms](https://forms.office.com)
- [SharePoint](#)
- [Teams](https://teams.microsoft.com)


**Este README é um guia prático para a transição do protótipo para uma solução operacional, totalmente integrada ao ecossistema Office 365.**

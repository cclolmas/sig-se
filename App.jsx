import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { EventoGeral } from './pages/EventoGeral'
import { CasoSaude } from './pages/CasoSaude'
import { Dados } from './pages/Dados'
import { Notificacoes } from './pages/Notificacoes'
import { Testes } from './pages/Testes'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evento-geral" element={<EventoGeral />} />
            <Route path="/caso-saude" element={<CasoSaude />} />
            <Route path="/dados" element={<Dados />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
            <Route path="/testes" element={<Testes />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App


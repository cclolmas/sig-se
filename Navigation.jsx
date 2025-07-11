import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FileText, 
  Heart, 
  Database, 
  Bell, 
  TestTube,
  Shield
} from 'lucide-react'

export function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/evento-geral', label: 'Evento Geral', icon: FileText },
    { path: '/caso-saude', label: 'Caso Saúde (LGPD)', icon: Heart },
    { path: '/dados', label: 'Dados', icon: Database },
    { path: '/notificacoes', label: 'Notificações', icon: Bell },
    { path: '/testes', label: 'Controle de Distribuição', icon: TestTube },
  ]

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">SIG-SE</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={path} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}


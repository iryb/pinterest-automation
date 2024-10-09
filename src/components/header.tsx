import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Users, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-800">
              Etsy to Pinterest
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/customers">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <Users className="h-5 w-5 mr-2" />
                Customers
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
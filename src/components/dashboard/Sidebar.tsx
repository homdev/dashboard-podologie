'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Settings, HelpCircle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Accueil' },
    { href: '/settings', icon: Settings, label: 'Paramètres' },
    { href: '/help', icon: HelpCircle, label: 'Aide' },
  ]

  return (
    <>
      <Button
        onClick={toggleSidebar}
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                      pathname === item.href ? 'bg-gray-100 text-primary' : 'text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
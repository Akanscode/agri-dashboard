'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Boxes, Info, LayoutDashboard, Menu, Store, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
  icon: typeof LayoutDashboard
  description?: string
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links: NavLink[] = [
    { label: "Overview", href: "/", icon: LayoutDashboard, description: "Dashboard" },
    { label: "Market Comparison", href: "/markets", icon: Store, description: "Compare prices" },
    { label: "Allocation", href: "/allocation", icon: Boxes, description: "Optimization" },
    { label: "About", href: "/about", icon: Info, description: "Research info" },
  ]

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const navigation = (
    <>
      <div className="p-6">
        <div className="mb-2">
          <h1 className="font-serif text-white text-2xl font-bold leading-tight tracking-tight">
            Nigeria Agri
          </h1>
          <h1 className="font-serif text-white text-2xl font-bold leading-tight tracking-tight">
            Forecasting
          </h1>
        </div>
        <p className="text-xs text-white mt-3 uppercase tracking-widest font-medium">
          Research Dashboard
        </p>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-accent/20 border border-accent/40 text-black shadow-md'
                    : 'text-parchment/80 hover:bg-white/5 border border-transparent hover:border-parchment/10'
                }`}
              >
                <link.icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium leading-tight ${active ? 'text-white' : 'text-parchment'}`}>
                    {link.label}
                  </div>
                  <div className="text-xs text-parchment/50 truncate">{link.description}</div>
                </div>
                {active && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="px-3 py-2">
        <div className="h-px bg-linear-to-r from-parchment/0 via-parchment/10 to-parchment/0" />
      </div>

      <div className="p-6 border-t border-parchment/10 space-y-4">
        <div className="bg-white/5 rounded-lg p-4 border border-parchment/10 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-widest font-semibold text-accent mb-2">Data Source</div>
          <div className="text-sm text-parchment leading-relaxed">WFP Food Prices Database</div>
          <div className="text-xs text-parchment/60 mt-2">Nigeria Agricultural Markets</div>
        </div>
        <div className="text-xs text-parchment/50 text-center pt-2">v1.0 • Production</div>
      </div>
    </>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 rounded-md bg-green-800 px-3 py-2 text-xl text-white shadow-lg md:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-linear-to-br from-green-700 to-green-900 text-white shadow-2xl transition-transform duration-200 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
          className="absolute right-4 top-4 text-xl text-white md:hidden"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        {navigation}
      </aside>
    </>
  )
}

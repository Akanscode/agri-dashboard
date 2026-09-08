'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  label: string
  href: string
  icon: string
  description?: string
}

export default function Sidebar() {
  const pathname = usePathname()

  const links: NavLink[] = [
    { label: "Overview", href: "/", icon: "", description: "Dashboard" },
    { label: "Market Comparison", href: "/markets", icon: "", description: "Compare prices" },
    { label: "Allocation", href: "/allocation", icon: "", description: "Optimization" },
    { label: "About", href: "/about", icon: "ℹ", description: "Research info" },
  ]

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-gradient-to-br from-green-700 to-green-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-2xl  z-50">
      {/* Logo Section */}
      <div className="p-6 ">
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

      {/* Navigation Section */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'bg-accent/20 border border-accent/40 text-black shadow-md'
                      : 'text-parchment/80 hover:bg-white/5 border border-transparent hover:border-parchment/10'
                  }
                `}
              >
                <span className="text-lg flex-shrink-0">{link.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium leading-tight ${active ? 'text-white' : 'text-parchment'}`}>
                    {link.label}
                  </div>
                  <div className="text-xs text-parchment/50 truncate">
                    {link.description}
                  </div>
                </div>
                {active && (
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Divider */}
      <div className="px-3 py-2">
        <div className="h-px bg-gradient-to-r from-parchment/0 via-parchment/10 to-parchment/0" />
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t border-parchment/10 space-y-4">
        <div className="bg-white/5 rounded-lg p-4 border border-parchment/10 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-widest font-semibold text-accent mb-2">
            Data Source
          </div>
          <div className="text-sm text-parchment leading-relaxed">
            WFP Food Prices Database
          </div>
          <div className="text-xs text-parchment/60 mt-2">
            Nigeria Agricultural Markets
          </div>
        </div>

        <div className="text-xs text-parchment/50 text-center pt-2">
          <span>v1.0 • Production</span>
        </div>
      </div>
    </aside>
  )
}
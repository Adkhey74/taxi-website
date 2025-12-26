"use client"

import { useI18n } from "@/lib/i18n/context"
import { Globe } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const languages = [
    { code: "fr" as const, label: "Français", codeLabel: "FR" },
    { code: "en" as const, label: "English", codeLabel: "EN" },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="h-10 px-3">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline font-semibold">
            {languages.find(l => l.code === locale)?.codeLabel}
          </span>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="p-2 w-40">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  locale === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{lang.codeLabel}</span>
                  <span className="font-medium">{lang.label}</span>
                  {locale === lang.code && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  )
}


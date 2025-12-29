"use client"

import { useI18n } from "@/lib/i18n/context"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import "flag-icons/css/flag-icons.min.css"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const languages = [
    { 
      code: "fr" as const, 
      label: "Français", 
      codeLabel: "FR", 
      flagCode: "fr"
    },
    { 
      code: "en" as const, 
      label: "English", 
      codeLabel: "EN", 
      flagCode: "gb"
    },
  ]

  const currentLanguage = languages.find(l => l.code === locale)

  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="h-10 px-3">
          <span className={`fi fi-${currentLanguage?.flagCode} mr-2`}></span>
          <span className="hidden sm:inline font-semibold">
            {currentLanguage?.codeLabel}
          </span>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="p-2 w-44">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                  locale === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`fi fi-${lang.flagCode}`}></span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{lang.label}</span>
                    <span className="text-xs opacity-80">{lang.codeLabel}</span>
                  </div>
                  {locale === lang.code && (
                    <span className="ml-auto text-sm">✓</span>
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


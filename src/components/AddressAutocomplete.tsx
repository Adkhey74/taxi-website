"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

interface AddressAutocompleteProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
  label?: string
}

interface AddressSuggestion {
  label: string
  value: string
}

export function AddressAutocomplete({
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
  className,
  label,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fermer les suggestions quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Recherche d'adresses avec l'API BAN (Base Adresse Nationale) améliorée
  const searchAddresses = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      // Essayer d'abord avec l'API BAN
      const banResponse = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=8&autocomplete=1`
      )
      const banData = await banResponse.json()

      let addressSuggestions: AddressSuggestion[] = []

      if (banData.features && banData.features.length > 0) {
        interface BANFeature {
          properties: {
            label: string
            score?: number
          }
        }
        interface ScoredSuggestion extends AddressSuggestion {
          score: number
        }
        
        addressSuggestions = banData.features
          .map((feature: BANFeature) => ({
            label: feature.properties.label,
            value: feature.properties.label,
            score: feature.properties.score || 0,
          }))
          .sort((a: ScoredSuggestion, b: ScoredSuggestion) => b.score - a.score)
          .slice(0, 6)
          .map((item: ScoredSuggestion) => ({
            label: item.label,
            value: item.value,
          }))
      }

      // Si pas assez de résultats, essayer avec Nominatim (OpenStreetMap) en complément
      if (addressSuggestions.length < 3) {
        try {
          const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=fr&addressdetails=1`
          )
          const nominatimData = await nominatimResponse.json()

          if (nominatimData && nominatimData.length > 0) {
            interface NominatimItem {
              display_name: string
            }
            const nominatimSuggestions = (nominatimData as NominatimItem[]).map((item) => ({
              label: item.display_name,
              value: item.display_name,
            }))

            // Fusionner les résultats en évitant les doublons
            const existingLabels = new Set(addressSuggestions.map(s => s.label.toLowerCase()))
            const newSuggestions = nominatimSuggestions.filter(
              (s: AddressSuggestion) => !existingLabels.has(s.label.toLowerCase())
            )
            addressSuggestions = [...addressSuggestions, ...newSuggestions].slice(0, 6)
          }
        } catch {
          // Ignorer les erreurs Nominatim, on garde les résultats BAN
        }
      }

      if (addressSuggestions.length > 0) {
        setSuggestions(addressSuggestions)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'adresse:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce pour éviter trop de requêtes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value && value.trim().length >= 2) {
        searchAddresses(value.trim())
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    const syntheticEvent = {
      target: {
        name,
        value: suggestion.value,
      },
    } as React.ChangeEvent<HTMLInputElement>

    onChange(syntheticEvent)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-foreground mb-1 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
          placeholder={placeholder}
          required={required}
          className={className}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            // Mettre en évidence la partie correspondante
            const queryLower = value.toLowerCase()
            const labelLower = suggestion.label.toLowerCase()
            const matchIndex = labelLower.indexOf(queryLower)
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors flex items-start gap-2 border-b border-border/50 last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm flex-1">
                  {matchIndex >= 0 ? (
                    <>
                      {suggestion.label.substring(0, matchIndex)}
                      <span className="font-semibold text-primary">
                        {suggestion.label.substring(matchIndex, matchIndex + value.length)}
                      </span>
                      {suggestion.label.substring(matchIndex + value.length)}
                    </>
                  ) : (
                    suggestion.label
                  )}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}


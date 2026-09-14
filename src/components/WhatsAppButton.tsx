"use client"

import { FaWhatsapp } from "react-icons/fa"
import { useI18n } from "@/lib/i18n/context"

const WHATSAPP_LINK_FR = "https://api.whatsapp.com/send?phone=33658686548&text=Bonjour%20je%20souhaite%20r%C3%A9server%20un%20taxi."
const WHATSAPP_LINK_EN = "https://api.whatsapp.com/send?phone=33658686548&text=Hello%20I%20would%20like%20to%20book%20a%20taxi."

export function WhatsAppButton() {
  const { locale, t } = useI18n()
  const whatsappLink = locale === "fr" ? WHATSAPP_LINK_FR : WHATSAPP_LINK_EN

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        right: "calc(env(safe-area-inset-right, 0px) + 1.5rem)",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
      }}
      className="fixed bottom-6 right-6 z-[60] flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label={t("cta.whatsapp") as string}
    >
      <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">{t("cta.whatsapp")}</span>
    </a>
  )
}

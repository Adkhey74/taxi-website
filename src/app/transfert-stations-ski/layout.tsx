// La page est un composant client, qui ne peut pas exporter de metadata : le layout s'en charge.
export { metadata } from "./metadata"

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Vehicles } from "@/components/Vehicles"
import { Advantages } from "@/components/Advantages"
import { Presentation } from "@/components/Presentation"
import { Contact } from "@/components/Contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Vehicles />
      <Advantages />
      <Presentation />
      <Contact />
    </main>
  )
}

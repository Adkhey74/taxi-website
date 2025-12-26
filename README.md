# TaxiExpress - Site Vitrine

Site vitrine professionnel pour une entreprise de transport en taxi, développé avec Next.js 15, TypeScript, TailwindCSS et shadcn/ui.

## 🚀 Fonctionnalités

- **Page d'accueil** avec section hero, services et contact
- **Navigation** responsive avec menu déroulant
- **Services détaillés** : aéroport, ville, longue distance, événements, express, forfait journée
- **Page de contact** avec formulaire de demande de devis
- **Page à propos** avec historique et valeurs de l'entreprise
- **Design responsive** optimisé pour mobile, tablette et desktop
- **Interface moderne** avec shadcn/ui et TailwindCSS

## 🛠️ Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **TailwindCSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI modernes et accessibles
- **Lucide React** - Icônes SVG optimisées

## 📦 Installation

```bash
# Cloner le projet
git clone <repository-url>
cd taxi-website

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🎨 Structure du projet

```
src/
├── app/                    # App Router de Next.js
│   ├── about/             # Page À propos
│   ├── contact/           # Page Contact
│   ├── services/          # Page Services
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants réutilisables
│   ├── ui/               # Composants shadcn/ui
│   ├── Header.tsx        # Navigation principale
│   ├── Hero.tsx          # Section hero
│   ├── Services.tsx      # Section services
│   ├── Contact.tsx       # Section contact
│   └── Footer.tsx        # Pied de page
└── lib/                  # Utilitaires
    └── utils.ts          # Fonctions utilitaires
```

## 🚖 Services proposés

1. **Transfert aéroport** - Suivi des vols, attente gratuite
2. **Transport en ville** - Déplacements urbains et banlieue
3. **Longue distance** - Voyages inter-villes
4. **Événements** - Mariages, soirées d'entreprise
5. **Service express** - Transport urgent en 15 minutes
6. **Forfait journée** - Location avec chauffeur 8h

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- **Mobile** (320px+)
- **Tablette** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1280px+)

## 🎯 Performance

- **SSG/SSR** avec Next.js pour un chargement rapide
- **Optimisation des images** avec Next.js Image
- **Code splitting** automatique
- **CSS purgé** avec TailwindCSS

## 📞 Contact

- **Téléphone** : 01 23 45 67 89
- **Email** : contact@taxiexpress.fr
- **Zone** : Paris et région parisienne
- **Disponibilité** : 24h/24 - 7j/7

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur :
- **Vercel** (recommandé)
- **Netlify**
- **Railway**
- **Docker**

```bash
# Build de production
npm run build

# Démarrage en production
npm start
```

## 📄 Licence

Ce projet est sous licence MIT.
# Configuration reCAPTCHA

Ce site utilise Google reCAPTCHA v2 pour protéger les formulaires de réservation contre les spams et les bots.

## Configuration

### 1. Obtenir les clés reCAPTCHA

1. Allez sur [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Cliquez sur "+" pour créer un nouveau site
3. Remplissez le formulaire :
   - **Label** : Nom de votre site (ex: "Hern Taxi")
   - **Type de reCAPTCHA** : reCAPTCHA v2 → "Je ne suis pas un robot"
   - **Domaines** : Ajoutez vos domaines :
     - `localhost` (pour le développement)
     - `taxi-website-production.up.railway.app` (votre domaine de production)
     - Votre domaine personnalisé si vous en avez un
4. Acceptez les conditions d'utilisation
5. Cliquez sur "Envoyer"

### 2. Ajouter les clés dans les variables d'environnement

Ajoutez ces deux variables dans votre fichier `.env` :

```env
# Clé publique (visible côté client)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre_clé_site_ici

# Clé secrète (côté serveur uniquement)
RECAPTCHA_SECRET_KEY=votre_clé_secrète_ici
```

### 3. Redémarrer le serveur

Après avoir ajouté les variables d'environnement, redémarrez votre serveur de développement :

```bash
npm run dev
```

## Fonctionnement

- Le captcha apparaît dans le formulaire de réservation (modal)
- L'utilisateur doit cocher "Je ne suis pas un robot"
- Le token est validé côté serveur avant la création de la réservation
- En développement, si les clés ne sont pas configurées, le captcha est ignoré (avec un avertissement dans les logs)

## Notes importantes

- **Gratuit** : reCAPTCHA v2 est gratuit jusqu'à 1 million de requêtes/mois
- **Production** : En production, le captcha est requis. En développement, il est optionnel si les clés ne sont pas configurées
- **Langue** : Le captcha s'adapte automatiquement à la langue du site (français/anglais)


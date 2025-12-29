# 📧 Configuration de l'envoi d'emails avec SendGrid

Ce guide explique comment configurer SendGrid pour envoyer des emails de réservation.

## 🔧 Configuration

### 1. Créer un compte SendGrid

1. Allez sur [https://sendgrid.com](https://sendgrid.com)
2. Créez un compte gratuit (100 emails/jour gratuits)
3. Une fois connecté, allez dans **Settings** > **API Keys**
4. Cliquez sur **Create API Key**
5. Donnez un nom à votre clé (ex: "Taxi Website Production")
6. Sélectionnez **Full Access** ou **Restricted Access** avec les permissions d'envoi d'emails
7. **Copiez votre clé API** (commence par `SG.`) - ⚠️ Vous ne pourrez la voir qu'une seule fois !

### 2. Vérifier un expéditeur (Single Sender Verification)

Pour envoyer des emails, vous devez vérifier une adresse email :

1. Allez dans **Settings** > **Sender Authentication**
2. Dans la section **Single Sender Verification**, cliquez sur **Verify a Single Sender**
3. Remplissez le formulaire avec vos informations :
   - **From Email Address** : votre adresse email (ex: `adil.apple74@gmail.com`)
   - **From Name** : nom de votre entreprise (ex: "Hern Taxi")
   - Remplissez les autres champs requis
4. SendGrid vous enverra un email de vérification
5. Ouvrez cet email et cliquez sur le lien de vérification
6. Une fois vérifié, vous pouvez utiliser cette adresse dans `FROM_EMAIL`

**Note :** Avec un Single Sender vérifié, vous pouvez envoyer à n'importe quelle adresse (pas seulement la vôtre) !

### 3. Configurer les variables d'environnement

Créez ou modifiez votre fichier `.env` à la racine du projet :

```env
# SendGrid API - Clé API obtenue sur https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Email de l'entreprise - Adresse qui recevra les notifications de nouvelles réservations
COMPANY_EMAIL="adil.apple74@gmail.com"

# Email d'envoi - Adresse depuis laquelle les emails seront envoyés (doit être vérifiée dans SendGrid)
FROM_EMAIL="adil.apple74@gmail.com"
```

**Important :**
- `SENDGRID_API_KEY` : La clé API que vous avez copiée depuis SendGrid
- `COMPANY_EMAIL` : L'email où vous recevrez les notifications de nouvelles réservations
- `FROM_EMAIL` : L'email que vous avez vérifié dans SendGrid (Single Sender)

### 4. Redémarrer le serveur

Après avoir modifié le `.env`, redémarrez votre serveur de développement :

```bash
npm run dev
```

## 📨 Types d'emails envoyés

Lorsqu'une réservation est créée, **deux emails** sont envoyés :

### 1. Email de confirmation au client
- **Destinataire :** L'email du client qui a fait la réservation
- **Contenu :** Confirmation avec tous les détails de la réservation
- **Sujet :** `Confirmation de réservation #XXXXXXXX`

### 2. Email de notification à l'entreprise
- **Destinataire :** L'email configuré dans `COMPANY_EMAIL`
- **Contenu :** Notification avec les informations client et détails de la réservation
- **Sujet :** `🆕 Nouvelle réservation #XXXXXXXX - [Type de service]`

## ⚙️ Configuration des adresses email

### Pour changer l'email qui reçoit les notifications :

Modifiez la variable `COMPANY_EMAIL` dans votre fichier `.env` :

```env
COMPANY_EMAIL="votre-email@exemple.com"
```

Vous pouvez mettre plusieurs emails en les séparant par des virgules :

```env
COMPANY_EMAIL="contact@hern-taxi.fr,admin@hern-taxi.fr"
```

**Note :** Pour plusieurs emails dans SendGrid, vous devrez modifier le code pour envoyer à chaque email séparément.

### Pour changer l'email d'envoi :

1. Vérifiez une nouvelle adresse dans SendGrid (Settings > Sender Authentication > Single Sender Verification)
2. Modifiez la variable `FROM_EMAIL` dans votre fichier `.env` :

```env
FROM_EMAIL="nouvelle-adresse@exemple.com"
```

⚠️ **Important :** L'email dans `FROM_EMAIL` doit être vérifié dans SendGrid avant de pouvoir l'utiliser.

## 🧪 Tester l'envoi d'emails

1. Assurez-vous que toutes les variables d'environnement sont configurées
2. Redémarrez votre serveur de développement : `npm run dev`
3. Créez une réservation de test via le formulaire
4. Vérifiez :
   - Les logs dans la console (devraient afficher "✅ Email envoyé")
   - La boîte de réception du client
   - La boîte de réception de l'entreprise (`COMPANY_EMAIL`)
   - Le dashboard SendGrid pour voir les emails envoyés

## 🐛 Dépannage

### Les emails ne sont pas envoyés

1. **Vérifiez les variables d'environnement :**
   ```bash
   # Vérifiez que les variables sont bien définies
   echo $SENDGRID_API_KEY
   echo $COMPANY_EMAIL
   echo $FROM_EMAIL
   ```

2. **Vérifiez les logs :**
   - Si vous voyez `⚠️ SENDGRID_API_KEY non configurée`, la clé API n'est pas définie
   - Si vous voyez `❌ Erreur lors de l'envoi`, vérifiez votre clé API SendGrid

3. **Vérifiez votre compte SendGrid :**
   - Allez sur [SendGrid Activity](https://app.sendgrid.com/email_activity)
   - Vérifiez si les emails apparaissent dans les logs
   - Vérifiez les erreurs éventuelles

### L'email FROM n'est pas vérifié

Si vous recevez une erreur indiquant que l'email d'envoi n'est pas vérifié :

1. Allez dans **Settings** > **Sender Authentication** > **Single Sender Verification**
2. Vérifiez que votre email est bien listé et marqué comme "Verified"
3. Si ce n'est pas le cas, vérifiez-le en suivant les instructions ci-dessus

### Erreur 403 - Forbidden

Cela peut signifier :
- Votre clé API n'a pas les bonnes permissions
- Votre compte SendGrid est limité ou suspendu
- Vous avez atteint la limite d'emails gratuits (100/jour)

## 📊 Limites du plan gratuit

Avec le plan gratuit de SendGrid :
- **100 emails/jour** gratuits
- Single Sender Verification disponible
- Pas besoin de domaine personnalisé (mais recommandé pour la production)

## 📚 Ressources

- [Documentation SendGrid](https://docs.sendgrid.com/)
- [Guide de vérification d'expéditeur](https://docs.sendgrid.com/ui/sending-email/sender-verification)
- [Dashboard SendGrid](https://app.sendgrid.com/)



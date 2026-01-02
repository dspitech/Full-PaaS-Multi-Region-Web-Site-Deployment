# API Backend - Azure Cosmos DB

API REST pour la gestion des étudiants avec Azure Cosmos DB.

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copiez le fichier `env.example` vers `.env` :

```bash
cp env.example .env
```

2. Remplissez les variables d'environnement dans `.env` :

```env
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key-here
COSMOS_DATABASE_ID=StudentsDB
COSMOS_CONTAINER_ID=students
PORT=4000
NODE_ENV=development
```

## 🏃 Démarrage

### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre sur `http://127.0.0.1:4000` par défaut. Si le port est occupé, il essaie automatiquement les ports 4001, 4002, 5000, etc.

## 📡 Endpoints API

### GET /health
Vérifie que l'API est opérationnelle.

**Réponse** :
```json
{
  "status": "OK",
  "message": "API Cosmos DB est opérationnelle"
}
```

### GET /api/students
Récupère tous les étudiants.

**Paramètres de requête** :
- `search` (optionnel) : Terme de recherche

**Exemple** :
```bash
GET /api/students
GET /api/students?search=marie
```

**Réponse** :
```json
[
  {
    "id": "student-123",
    "firstName": "Marie",
    "lastName": "Laurent",
    "email": "marie.laurent@universite.fr",
    "phone": "+33 6 12 34 56 78",
    "program": "Informatique",
    "year": 3,
    "status": "active",
    "enrollmentDate": "2022-09-01"
  }
]
```

### GET /api/students/:id
Récupère un étudiant par son ID.

**Exemple** :
```bash
GET /api/students/student-123
```

**Réponse** :
```json
{
  "id": "student-123",
  "firstName": "Marie",
  "lastName": "Laurent",
  ...
}
```

### POST /api/students
Crée un nouvel étudiant.

**Corps de la requête** :
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@universite.fr",
  "phone": "+33 6 12 34 56 78",
  "program": "Informatique",
  "year": 1,
  "status": "active",
  "enrollmentDate": "2024-09-01"
}
```

**Réponse** : 201 Created
```json
{
  "id": "student-1234567890-abc123",
  "firstName": "Jean",
  ...
}
```

### PUT /api/students/:id
Met à jour un étudiant existant.

**Corps de la requête** :
```json
{
  "firstName": "Jean",
  "lastName": "Martin",
  ...
}
```

**Réponse** :
```json
{
  "id": "student-123",
  "firstName": "Jean",
  "lastName": "Martin",
  ...
}
```

### DELETE /api/students/:id
Supprime un étudiant.

**Exemple** :
```bash
DELETE /api/students/student-123
```

**Réponse** :
```json
{
  "success": true,
  "message": "Étudiant supprimé avec succès"
}
```

## 🏗️ Structure du projet

```
server/
├── config/
│   └── cosmos.js          # Configuration Cosmos DB
├── services/
│   └── studentService.js  # Services pour interagir avec Cosmos DB
├── routes/
│   └── students.js        # Routes API pour les étudiants
├── server.js              # Point d'entrée de l'application
├── package.json
└── .env                   # Variables d'environnement (non commité)
```

## 🔧 Développement

### Initialisation automatique

Le serveur crée automatiquement la base de données et le conteneur s'ils n'existent pas au démarrage.

### Logs

Les erreurs sont loggées dans la console. En production, considérez utiliser un service de logging comme Winston ou Pino.

## 🐛 Dépannage

### Erreur de connexion Cosmos DB

- Vérifiez que `COSMOS_ENDPOINT` et `COSMOS_KEY` sont corrects
- Vérifiez que le compte Cosmos DB est actif dans Azure
- Vérifiez votre connexion internet

### Erreur 404

- Vérifiez que la base de données et le conteneur existent
- Le serveur les crée automatiquement au démarrage

## 📦 Dépendances

- `@azure/cosmos` : SDK Azure Cosmos DB
- `express` : Framework web
- `cors` : Middleware CORS
- `dotenv` : Gestion des variables d'environnement


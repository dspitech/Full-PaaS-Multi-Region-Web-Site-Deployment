# DSPI-TECH - Plateforme de Gestion des Étudiants

[![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cosmos DB](https://img.shields.io/badge/Azure%20Cosmos%20DB-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/services/cosmos-db)

> Application web professionnelle de gestion des étudiants déployée sur Azure avec architecture multi-régions haute disponibilité.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Documentation](#documentation)
- [Support](#support)

## 🎯 Vue d'ensemble

**DSPI-TECH** est une plateforme web moderne et sécurisée pour la gestion complète des étudiants. L'application offre une interface intuitive permettant de gérer les inscriptions, suivre les parcours académiques, et analyser les statistiques en temps réel.

### Caractéristiques principales

- ✅ **Haute disponibilité** : Déploiement multi-régions avec basculement automatique
- ✅ **Sécurité renforcée** : Private Endpoint pour Cosmos DB, authentification Azure AD
- ✅ **Performance optimale** : Distribution de trafic via Azure Traffic Manager
- ✅ **Scalabilité** : Architecture serverless avec Azure App Service
- ✅ **Données répliquées** : Geo-réplication automatique entre deux régions

## 🏗️ Architecture

### Architecture globale

L'application est déployée selon une architecture **multi-régions** avec les composants suivants :

![Texte alternatif](/public/Architecture.png)

### Composants Azure

| Composant | Description | Rôle |
|-----------|-------------|------|
| **Azure DNS** | Service de résolution DNS | Point d'entrée principal pour les requêtes |
| **Azure Traffic Manager** | Gestionnaire de trafic global | Distribution du trafic entre les deux régions |
| **Azure App Service** (x2) | Hébergement web PaaS | Front-end et API backend dans chaque région |
| **Azure Cosmos DB** (x2) | Base de données NoSQL | Stockage des données avec réplication géographique |
| **Private Endpoint** | Connexion privée sécurisée | Isolation réseau pour Cosmos DB |
| **Azure Active Directory** | Service d'identité | Authentification et autorisation |

### Flux de données

1. **Requête utilisateur** → Azure DNS résout le nom de domaine
2. **Routage** → Azure Traffic Manager dirige vers la région la plus proche
3. **Authentification** → Azure AD valide l'identité de l'utilisateur
4. **Application** → Azure App Service traite la requête
5. **Base de données** → Cosmos DB via Private Endpoint (connexion sécurisée)
6. **Réplication** → Les données sont synchronisées entre les deux régions

### Avantages de l'architecture

- **Haute disponibilité** : 99.95% SLA avec basculement automatique
- **Performance** : Latence réduite grâce au routage géographique
- **Sécurité** : Private Endpoint empêche l'exposition publique de Cosmos DB
- **Disaster Recovery** : Réplication automatique pour continuité d'activité
- **Scalabilité** : Mise à l'échelle automatique selon la charge

## ✨ Fonctionnalités

### Gestion des étudiants
- ✅ Création, modification et suppression d'étudiants
- ✅ Recherche et filtrage avancés (statut, programme, année)
- ✅ Statistiques en temps réel (total, actifs, programmes, taux de réussite)
- ✅ Export et visualisation des données

### Tableau de bord
- ✅ Vue d'ensemble avec métriques clés
- ✅ Graphiques et analyses
- ✅ Filtres dynamiques
- ✅ Interface responsive

### Sécurité
- ✅ Authentification Azure AD
- ✅ Connexions sécurisées (HTTPS)
- ✅ Private Endpoint pour la base de données
- ✅ Chiffrement des données en transit et au repos

## 🛠️ Technologies

### Frontend
- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles
- **React Query** - Gestion d'état serveur
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Azure Cosmos DB SDK** - Client Cosmos DB
- **CORS** - Gestion des requêtes cross-origin

### Infrastructure
- **Azure App Service** - Hébergement PaaS
- **Azure Cosmos DB** - Base de données NoSQL
- **Azure Traffic Manager** - Distribution de trafic
- **Azure DNS** - Résolution DNS
- **Azure Active Directory** - Identité et accès

## 📦 Prérequis

### Développement local
- **Node.js** 18+ ([Installation](https://nodejs.org))
- **npm** ou **yarn**
- **Git**

### Déploiement Azure
- **Compte Azure** actif
- **Azure CLI** installé ([Installation](https://docs.microsoft.com/cli/azure/install-azure-cli))
- **Permissions** : Contributeur sur les ressources Azure
- **Abonnement Azure** avec quotas suffisants

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd Full-PaaS-Multi-Region-Web-Site-Deployment
```

### 2. Installer les dépendances

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 3. Configuration locale

Consultez [DEMARRAGE.md](./DEMARRAGE.md) pour la configuration complète du développement local.

## ⚙️ Configuration

### Variables d'environnement

#### Backend (`server/.env`)

```env
# Azure Cosmos DB
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
COSMOS_DATABASE_ID=StudentsDB
COSMOS_CONTAINER_ID=students

# Server
PORT=4000
NODE_ENV=development
```

#### Frontend (optionnel)

```env
VITE_API_URL=http://localhost:4000/api
```

### Configuration Azure

Pour la configuration complète de l'infrastructure Azure, consultez :
- [COSMOS_DB_SETUP.md](./COSMOS_DB_SETUP.md) - Configuration Cosmos DB
- [AZURE_COSMOS_DB_TABLE.md](./AZURE_COSMOS_DB_TABLE.md) - Structure de la base de données

## 🚢 Déploiement

### Déploiement sur Azure App Service

#### Prérequis de déploiement

1. **Créer les ressources Azure** :
   ```bash
   # Créer le groupe de ressources
   az group create --name rg-dspi-tech --location francecentral
   
   # Créer le compte Cosmos DB
   az cosmosdb create \
     --name dspi-tech-cosmos \
     --resource-group rg-dspi-tech \
     --default-consistency-level Session
   ```

2. **Configurer Private Endpoint** (voir documentation Azure)

3. **Créer les App Services** dans deux régions différentes

4. **Configurer Traffic Manager** pour router le trafic

#### Déploiement via Azure CLI

```bash
# Build du frontend
npm run build

# Déploiement App Service Région 1
az webapp deploy \
  --resource-group rg-dspi-tech \
  --name app-dspi-tech-region1 \
  --src-path ./dist

# Déploiement App Service Région 2
az webapp deploy \
  --resource-group rg-dspi-tech \
  --name app-dspi-tech-region2 \
  --src-path ./dist
```

#### Configuration des variables d'environnement App Service

```bash
# Région 1
az webapp config appsettings set \
  --resource-group rg-dspi-tech \
  --name app-dspi-tech-region1 \
  --settings \
    COSMOS_ENDPOINT="<endpoint>" \
    COSMOS_KEY="<key>" \
    COSMOS_DATABASE_ID="StudentsDB" \
    COSMOS_CONTAINER_ID="students"

# Région 2 (identique)
az webapp config appsettings set \
  --resource-group rg-dspi-tech \
  --name app-dspi-tech-region2 \
  --settings \
    COSMOS_ENDPOINT="<endpoint>" \
    COSMOS_KEY="<key>" \
    COSMOS_DATABASE_ID="StudentsDB" \
    COSMOS_CONTAINER_ID="students"
```

### Configuration Traffic Manager

```bash
# Créer le profil Traffic Manager
az network traffic-manager profile create \
  --resource-group rg-dspi-tech \
  --name tm-dspi-tech \
  --routing-method Performance \
  --unique-dns-name dspi-tech

# Ajouter les endpoints (régions)
az network traffic-manager endpoint create \
  --resource-group rg-dspi-tech \
  --profile-name tm-dspi-tech \
  --name region1 \
  --type azureEndpoints \
  --target-resource-id <app-service-1-id>

az network traffic-manager endpoint create \
  --resource-group rg-dspi-tech \
  --profile-name tm-dspi-tech \
  --name region2 \
  --type azureEndpoints \
  --target-resource-id <app-service-2-id>
```

## 📚 Documentation

### Documentation technique

- [DEMARRAGE.md](./DEMARRAGE.md) - Guide de démarrage rapide
- [QUICK_START.md](./QUICK_START.md) - Configuration rapide Cosmos DB
- [COSMOS_DB_SETUP.md](./COSMOS_DB_SETUP.md) - Configuration détaillée Cosmos DB
- [AZURE_COSMOS_DB_TABLE.md](./AZURE_COSMOS_DB_TABLE.md) - Structure de la base de données
- [server/README.md](./server/README.md) - Documentation API backend
- [VERIFICATION_ENV.md](./VERIFICATION_ENV.md) - Vérification de la configuration

### API Documentation

L'API backend expose les endpoints suivants :

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/health` | Vérification de santé |
| `GET` | `/api/students` | Liste des étudiants |
| `GET` | `/api/students/:id` | Détails d'un étudiant |
| `POST` | `/api/students` | Créer un étudiant |
| `PUT` | `/api/students/:id` | Modifier un étudiant |
| `DELETE` | `/api/students/:id` | Supprimer un étudiant |

Consultez [server/README.md](./server/README.md) pour la documentation complète de l'API.

## 🔒 Sécurité

### Mesures de sécurité implémentées

- ✅ **Private Endpoint** : Cosmos DB accessible uniquement via réseau privé
- ✅ **HTTPS** : Toutes les communications chiffrées
- ✅ **Azure AD** : Authentification centralisée
- ✅ **Variables d'environnement** : Secrets stockés de manière sécurisée
- ✅ **CORS** : Restrictions d'origine configurées
- ✅ **Validation** : Validation des entrées côté serveur

### Bonnes pratiques

- Ne jamais commiter les fichiers `.env`
- Utiliser Azure Key Vault pour les secrets en production
- Activer les logs d'audit Azure
- Configurer les alertes de sécurité
- Mettre en place un monitoring continu

## 📊 Monitoring et Logs

### Azure Monitor

- **Application Insights** : Suivi des performances
- **Log Analytics** : Centralisation des logs
- **Alertes** : Notifications en cas d'incident

### Métriques surveillées

- Temps de réponse des requêtes
- Taux d'erreur
- Utilisation des ressources
- Latence Cosmos DB
- Disponibilité des régions

## 🤝 Support

### Ressources

- **Documentation Azure** : [docs.microsoft.com/azure](https://docs.microsoft.com/azure)
- **Documentation Cosmos DB** : [docs.microsoft.com/azure/cosmos-db](https://docs.microsoft.com/azure/cosmos-db)
- **Support technique** : Contactez l'équipe DevOps

### Contribution

Pour contribuer au projet, veuillez suivre les guidelines de contribution et créer une pull request.

## 📄 Licence

Propriétaire - DSPI-TECH © 2024. Tous droits réservés.

---

**DSPI-TECH** - *Excellence académique, innovation technologique*

# DSPI-TECH - Plateforme de Gestion des Étudiants

[![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cosmos DB](https://img.shields.io/badge/Azure%20Cosmos%20DB-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/services/cosmos-db)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Azure App Service](https://img.shields.io/badge/Azure%20App%20Service-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/services/app-service)
[![Traffic Manager](https://img.shields.io/badge/Azure%20Traffic%20Manager-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/services/traffic-manager)
[![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=flat&logo=powershell&logoColor=white)](https://docs.microsoft.com/powershell)

> Application web professionnelle de gestion des étudiants déployée sur Azure avec architecture multi-régions haute disponibilité.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage local](#démarrage-local)
- [Déploiement Azure](#déploiement-azure)
- [Documentation](#documentation)
- [Sécurité](#sécurité)
- [Monitoring](#monitoring-et-logs)
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

![Architecture Azure Multi-Régions](/public/Architecture.png)

### Composants Azure

| Composant | Description | Rôle |
|-----------|-------------|------|
| **Azure DNS** | Service de résolution DNS | Point d'entrée principal pour les requêtes |
| **Azure Traffic Manager** | Gestionnaire de trafic global | Distribution du trafic entre les deux régions |
| **Azure App Service** (x2) | Hébergement web PaaS | Front-end et API backend dans chaque région |
| **Azure Cosmos DB** (x2) | Base de données NoSQL | Stockage des données avec réplication géographique |
| **Private Endpoint** | Connexion privée sécurisée | Isolation réseau pour Cosmos DB |
| **Azure Active Directory** | Service d'identité | Authentification et autorisation |
| **Virtual Network** | Réseau virtuel isolé | Sécurisation des connexions avec Service Endpoint |

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
- **Azure Virtual Network** - Isolation réseau

## 📦 Prérequis

### Développement local
- **Node.js** 18+ ([Installation](https://nodejs.org))
- **npm** ou **yarn**
- **Git**
- **Compte Azure Cosmos DB** (pour les données)

### Déploiement Azure
- **Compte Azure** actif
- **Azure CLI** ou **Azure PowerShell** installé
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

## ⚙️ Configuration

### Variables d'environnement

#### Backend (`server/.env`)

Créez un fichier `.env` dans le dossier `server/` avec le contenu suivant :

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

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:4000/api
```

> **Note** : En développement, le proxy Vite est configuré automatiquement dans `vite.config.ts`.

### Vérification de la configuration

Utilisez le script de vérification pour valider votre configuration :

```bash
cd server
npm run check-env
```

## 🏃 Démarrage local

### Méthode : Démarrage manuel

#### Terminal 1 - Backend API

```bash
cd server
npm start
```

Vous devriez voir :
```
✅ Azure Cosmos DB initialisé avec succès
🚀 Serveur API démarré sur http://127.0.0.1:4000
```

#### Terminal 2 - Frontend

```bash
npm run dev
```

Le frontend devrait démarrer sur `http://localhost:8080`

### Vérification

1. **Backend** : Ouvrez `http://127.0.0.1:4000/health`
2. **Frontend** : Ouvrez `http://localhost:8080`

## 🚢 Déploiement Azure

### Déploiement via Azure Cloud Shell (PowerShell)

Cette méthode utilise Azure Cloud Shell avec PowerShell pour créer toutes les ressources nécessaires. Les scripts sont organisés par étapes pour faciliter le déploiement.

#### Étape 1 : Création du groupe de ressources et réseau virtuel

```powershell
# Variables de base
$RG_NAME = "rg-global-node-prod"
$LOC_FR  = "francecentral"
$LOC_NO  = "norwayeast"
$VNET_NAME = "vnet-cosmos-security"

# Création du Groupe de Ressources
New-AzResourceGroup -Name $RG_NAME -Location $LOC_FR -Force

# Création du VNET avec Service Endpoint pour Cosmos DB
$subnetConfig = New-AzVirtualNetworkSubnetConfig -Name "CosmosSubnet" -AddressPrefix "10.0.1.0/24" `
                -ServiceEndpoint "Microsoft.AzureCosmosDB"

$vnet = New-AzVirtualNetwork -Name $VNET_NAME -ResourceGroupName $RG_NAME -Location $LOC_NO `
        -AddressPrefix "10.0.0.0/16" -Subnet $subnetConfig

Write-Host "Étape 1 terminée : Réseau prêt." -ForegroundColor Green
```

#### Étape 2 : Création de Cosmos DB avec intégration VNET

```powershell
# Variables
$COSMOS_NAME = "cosmos-node-db-$(Get-Random -Max 9999)"
$DB_NAME = "StudentsDB"
$CONTAINER_NAME = "students"

Write-Host "Création du compte Cosmos DB (Serverless + VNET)..." -ForegroundColor Yellow

# Création du compte Cosmos DB avec mode Serverless et intégration VNET
$cosmosAccount = New-AzCosmosDBAccount -ResourceGroupName $RG_NAME -Name $COSMOS_NAME `
    -Location $LOC_NO -Capabilities "EnableServerless" `
    -VirtualNetworkRule $vnet.Subnets[0].Id `
    -EnableVirtualNetwork:$true `
    -EnableAutomaticFailover:$false

Write-Host "Création de la base de données SQL..." -ForegroundColor Yellow
New-AzCosmosDBSqlDatabase -ResourceGroupName $RG_NAME -AccountName $COSMOS_NAME -Name $DB_NAME

Write-Host "Création du conteneur..." -ForegroundColor Yellow
New-AzCosmosDBSqlContainer -ResourceGroupName $RG_NAME -AccountName $COSMOS_NAME `
    -DatabaseName $DB_NAME -Name $CONTAINER_NAME -PartitionKeyPath "/id" -PartitionKeyKind "Hash"

Write-Host "Étape 2 terminée avec succès !" -ForegroundColor Green
```

#### Étape 3 : Création des App Service Plans

```powershell
$ID = Get-Random -Max 9999
$PLAN_FR_NAME = "asp-fr-$ID"
$PLAN_NO_NAME = "asp-no-$ID"

# Plan App Service France (Standard tier, Linux)
$planFR = New-AzAppServicePlan -Name $PLAN_FR_NAME -ResourceGroupName $RG_NAME `
    -Location $LOC_FR -Tier Standard -Linux

# Plan App Service Norvège (Standard tier, Linux)
$planNO = New-AzAppServicePlan -Name $PLAN_NO_NAME -ResourceGroupName $RG_NAME `
    -Location $LOC_NO -Tier Standard -Linux

Write-Host "Étape 3 terminée : App Service Plans créés." -ForegroundColor Green
```

#### Étape 4 : Déploiement des Web Apps (Node.js)

```powershell
$RUNTIME = "NODE|20-lts"
$webApps = @()

# Web App France
$nameFR = "webapp-node-fr-$ID"
$appFR = New-AzWebApp -Name $nameFR -ResourceGroupName $RG_NAME `
    -Location $LOC_FR -AppServicePlan $PLAN_FR_NAME
$appFR.SiteConfig.LinuxFxVersion = $RUNTIME
$appFR.HttpsOnly = $true
Set-AzWebApp -WebApp $appFR | Out-Null
$webApps += $appFR

# Web App Norvège
$nameNO = "webapp-node-no-$ID"
$appNO = New-AzWebApp -Name $nameNO -ResourceGroupName $RG_NAME `
    -Location $LOC_NO -AppServicePlan $PLAN_NO_NAME
$appNO.SiteConfig.LinuxFxVersion = $RUNTIME
$appNO.HttpsOnly = $true
Set-AzWebApp -WebApp $appNO | Out-Null
$webApps += $appNO

Write-Host "Étape 4 terminée : Web Apps déployées." -ForegroundColor Green
```

#### Étape 5 : Configuration de Traffic Manager

```powershell
$TM_NAME = "tm-node-global-$ID"

# Création du profil Traffic Manager avec routage Performance
$tmProfile = New-AzTrafficManagerProfile -Name $TM_NAME -ResourceGroupName $RG_NAME `
    -TrafficRoutingMethod Performance -RelativeDnsName $TM_NAME `
    -MonitorProtocol HTTPS -MonitorPort 443 -MonitorPath "/" -Ttl 30

# Ajout des endpoints pour chaque région
foreach ($app in $webApps) {
    Add-AzTrafficManagerEndpointConfig -EndpointName "ep-$($app.Location.Replace(' ',''))" `
        -TrafficManagerProfile $tmProfile -Type AzureEndpoints `
        -TargetResourceId $app.Id -EndpointStatus Enabled `
        -EndpointLocation $app.Location | Out-Null
}

Set-AzTrafficManagerProfile -TrafficManagerProfile $tmProfile | Out-Null

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "FINI ! URL : https://$TM_NAME.trafficmanager.net" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
```

#### Étape 6 : Configuration des variables d'environnement

```powershell
# Récupérer les clés Cosmos DB
$cosmosKeys = Get-AzCosmosDBAccountKey -ResourceGroupName $RG_NAME -Name $COSMOS_NAME
$cosmosEndpoint = (Get-AzCosmosDBAccount -ResourceGroupName $RG_NAME -Name $COSMOS_NAME).DocumentEndpoint

# Configuration Web App France
$appSettingsFR = @{
    COSMOS_ENDPOINT = $cosmosEndpoint
    COSMOS_KEY = $cosmosKeys.PrimaryMasterKey
    COSMOS_DATABASE_ID = "StudentsDB"
    COSMOS_CONTAINER_ID = "students"
    NODE_ENV = "production"
}
Set-AzWebApp -ResourceGroupName $RG_NAME -Name $nameFR -AppSettings $appSettingsFR

# Configuration Web App Norvège
$appSettingsNO = @{
    COSMOS_ENDPOINT = $cosmosEndpoint
    COSMOS_KEY = $cosmosKeys.PrimaryMasterKey
    COSMOS_DATABASE_ID = "StudentsDB"
    COSMOS_CONTAINER_ID = "students"
    NODE_ENV = "production"
}
Set-AzWebApp -ResourceGroupName $RG_NAME -Name $nameNO -AppSettings $appSettingsNO

Write-Host "Variables d'environnement configurées avec succès !" -ForegroundColor Green
```

#### Étape 7 : Configuration du déploiement continu depuis GitHub

Configurez le déploiement automatique depuis votre repository GitHub vers les deux App Services.

##### Via PowerShell (Cloud Shell)

```powershell
# Variables GitHub
$GITHUB_REPO = "votre-username/votre-repo"  # Format: owner/repository
$GITHUB_BRANCH = "main"  # ou "master"
$GITHUB_TOKEN = "votre-token-github"  # Token avec permissions repo

# Configuration pour Web App France
$sourceControlFR = @{
    RepoUrl = "https://github.com/$GITHUB_REPO"
    Branch = $GITHUB_BRANCH
    ManualIntegration = $false
}
Set-AzWebAppSourceControl -ResourceGroupName $RG_NAME -Name $nameFR `
    -RepoUrl $sourceControlFR.RepoUrl -Branch $sourceControlFR.Branch `
    -ManualIntegration $sourceControlFR.ManualIntegration

# Configuration pour Web App Norvège
$sourceControlNO = @{
    RepoUrl = "https://github.com/$GITHUB_REPO"
    Branch = $GITHUB_BRANCH
    ManualIntegration = $false
}
Set-AzWebAppSourceControl -ResourceGroupName $RG_NAME -Name $nameNO `
    -RepoUrl $sourceControlNO.RepoUrl -Branch $sourceControlNO.Branch `
    -ManualIntegration $sourceControlNO.ManualIntegration

Write-Host "Déploiement continu configuré depuis GitHub !" -ForegroundColor Green
```

##### Via Azure CLI

```bash
# Configuration pour Web App France
az webapp deployment source config \
  --name $nameFR \
  --resource-group $RG_NAME \
  --repo-url https://github.com/$GITHUB_REPO \
  --branch $GITHUB_BRANCH \
  --manual-integration false

# Configuration pour Web App Norvège
az webapp deployment source config \
  --name $nameNO \
  --resource-group $RG_NAME \
  --repo-url https://github.com/$GITHUB_REPO \
  --branch $GITHUB_BRANCH \
  --manual-integration false
```

##### Via le Portail Azure

1. Accédez à votre **App Service** (France ou Norvège)
2. Dans le menu de gauche, allez dans **Déploiement** → **Centre de déploiement**
3. Sélectionnez **GitHub** comme source
4. Autorisez Azure à accéder à votre compte GitHub
5. Sélectionnez :
   - **Organisation** : Votre organisation GitHub
   - **Repository** : Votre repository
   - **Branche** : `main` ou `master`
6. Cliquez sur **Enregistrer**
7. Répétez pour la deuxième App Service

##### Configuration du build automatique

Pour un build automatique du frontend, créez un fichier `.github/workflows/azure-deploy.yml` :

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          npm install
          cd server && npm install && cd ..
      
      - name: Build frontend
        run: npm run build
      
      - name: Deploy to Azure App Service (France)
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME_FR }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_FR }}
          package: ./dist
      
      - name: Deploy to Azure App Service (Norway)
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME_NO }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE_NO }}
          package: ./dist
```

> **Note** : Pour utiliser GitHub Actions, vous devez configurer les secrets suivants dans votre repository GitHub :
> - `AZURE_WEBAPP_NAME_FR` : Nom de l'App Service France
> - `AZURE_WEBAPP_PUBLISH_PROFILE_FR` : Profil de publication France
> - `AZURE_WEBAPP_NAME_NO` : Nom de l'App Service Norvège
> - `AZURE_WEBAPP_PUBLISH_PROFILE_NO` : Profil de publication Norvège

#### Étape 8 : Déploiement manuel (Alternative)

Si vous préférez un déploiement manuel sans intégration GitHub :

```bash
# Build du frontend
npm run build

# Déploiement via Azure CLI
az webapp deploy \
  --resource-group $RG_NAME \
  --name $nameFR \
  --src-path ./dist \
  --type static

az webapp deploy \
  --resource-group $RG_NAME \
  --name $nameNO \
  --src-path ./dist \
  --type static
```

> **Note** : Le déploiement continu depuis GitHub est recommandé pour la production, permettant un déploiement automatique à chaque push sur la branche principale.

### Déploiement via Azure CLI

Alternative avec Azure CLI :

```bash
# Créer le groupe de ressources
az group create --name rg-global-node-prod --location francecentral

# Créer le compte Cosmos DB
az cosmosdb create \
  --name cosmos-node-db \
  --resource-group rg-global-node-prod \
  --default-consistency-level Session

# Créer les App Services (voir scripts PowerShell ci-dessus pour la configuration complète)
```

## 📚 Documentation

### Documentation technique

- [server/README.md](./server/README.md) - Documentation API backend complète
- [server/check-env.js](./server/check-env.js) - Script de vérification de la configuration

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
- ✅ **Service Endpoint** : Isolation réseau via VNET

### Bonnes pratiques

- Ne jamais commiter les fichiers `.env`
- Utiliser Azure Key Vault pour les secrets en production
- Activer les logs d'audit Azure
- Configurer les alertes de sécurité
- Mettre en place un monitoring continu
- Utiliser des Private Endpoints pour toutes les ressources sensibles

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
- Distribution du trafic via Traffic Manager

## 🤝 Support

### Ressources

- **Documentation Azure** : [docs.microsoft.com/azure](https://docs.microsoft.com/azure)
- **Documentation Cosmos DB** : [docs.microsoft.com/azure/cosmos-db](https://docs.microsoft.com/azure/cosmos-db)
- **Documentation App Service** : [docs.microsoft.com/azure/app-service](https://docs.microsoft.com/azure/app-service)
- **Support technique** : Contactez l'équipe DevOps

### Contribution

Pour contribuer au projet, veuillez suivre les guidelines de contribution et créer une pull request.

## 📄 Licence

Propriétaire - DSPI-TECH © 2024. Tous droits réservés.

---

**DSPI-TECH** - *Excellence académique, innovation technologique*

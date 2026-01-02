#!/bin/bash
# Script bash pour démarrer le backend et le frontend

echo "🚀 Démarrage de l'application..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# Démarrer le backend en arrière-plan
echo "📦 Démarrage du backend API..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Attendre un peu pour que le backend démarre
sleep 3

# Démarrer le frontend
echo "🌐 Démarrage du frontend..."
echo ""
echo "💡 Le backend tourne en arrière-plan (PID: $BACKEND_PID)" 
echo "💡 Pour arrêter le backend: kill $BACKEND_PID"
echo ""

npm run dev

# Nettoyer quand on arrête avec Ctrl+C
trap "kill $BACKEND_PID 2>/dev/null" EXIT


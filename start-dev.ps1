# Script PowerShell pour démarrer le backend et le frontend
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Green
Write-Host ""

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Installez Node.js depuis https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Démarrer le backend dans un nouveau terminal
Write-Host "📦 Démarrage du backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; Write-Host '🔧 Backend API - Terminal 1' -ForegroundColor Cyan; Write-Host ''; npm start"

# Attendre un peu pour que le backend démarre
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🌐 Démarrage du frontend..." -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Le backend tourne dans un autre terminal PowerShell" -ForegroundColor Cyan
Write-Host "💡 Le frontend va démarrer dans ce terminal" -ForegroundColor Cyan
Write-Host ""

npm run dev


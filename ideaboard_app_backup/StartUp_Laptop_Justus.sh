#!/bin/bash
set -e  # Stoppt bei Fehlern

echo "=== Starting IdeaBoard Dev Environment ==="

# 1️⃣ ENV laden
if [ ! -f .env ]; then
  echo ".env file missing! Please create it from .env.example"
  exit 1
fi
set -a
source .env
set +a
echo "✅ .env loaded"

# 2️⃣ Node-Version checken (optional)
if [ -f .nvmrc ]; then
  nvm use
fi

# 3️⃣ Postgres über Docker starten (falls Docker genutzt wird)
if [ -f docker-compose.yml ]; then
  echo "Starting PostgreSQL via docker-compose..."
  docker compose up -d
fi

# 4️⃣ Prisma Client generieren (nur falls noch nicht vorhanden)
if [ ! -d "src/generated/prisma" ]; then
  echo "Generating Prisma Client..."
  npx prisma generate
fi

# 5️⃣ Datenbankmigration durchführen
echo "Running Prisma migrations..."
npx prisma migrate dev --name init || true

# 6️⃣ Next.js Dev-Server starten
echo "Starting Next.js Dev server..."
npm run dev

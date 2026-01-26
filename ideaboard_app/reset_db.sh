#!/bin/bash
# reset_db.sh
# Automatisches Reset der DB + Prisma Migration + Next.js Dev-Server
# Achtung: Alte Migrationen + Docker-Volumes werden gelöscht!

echo "🚀 Starte Reset-Skript für die DB..."

# 1️⃣ Docker-Container stoppen + Volumes löschen
echo "🔹 Stoppe Docker-Container und entferne Volumes..."
docker compose down -v || echo "⚠️ Docker Compose down fehlgeschlagen (vielleicht schon gestoppt)"

# 2️⃣ Alte Migrationen löschen
if [ -d "prisma/migrations" ]; then
    echo "🔹 Lösche alten Migrations-Ordner..."
    rm -rf prisma/migrations
else
    echo "🔹 Kein Migrations-Ordner vorhanden, überspringe..."
fi

# 3️⃣ Docker-Container neu starten
echo "🔹 Starte Docker-Container neu..."
docker compose up -d || { echo "❌ Docker Compose up fehlgeschlagen"; exit 1; }

# 3️⃣a Warten, bis die DB bereit ist
echo "⏳ Warte, bis die DB bereit ist..."
until docker exec idea_database pg_isready -U root -d idea; do
  sleep 1
done
echo "✅ DB ist bereit"

# 4️⃣ Prisma Init-Migration erstellen
echo "🔹 Erstelle neue Prisma Migration..."
npx prisma migrate dev --name init || { echo "❌ Prisma Migration fehlgeschlagen"; exit 1; }

# 5️⃣ Tabellen und Enums prüfen
echo "🔹 Prüfe Tabellen in der DB..."
docker exec -it idea_database psql -U root -d idea -c "\dt"
docker exec -it idea_database psql -U root -d idea -c "\dT"

# 6️⃣ Dev-Server starten
echo "🔹 Starte Next.js Dev-Server..."
npm run dev

#!/bin/bash
# autoSetupUbuntu.sh - SSH-tauglich für Ideaboard

# --- Setze Basisverzeichnis ---
APP_DIR="$HOME/ideaboard_masterplan/ideaboard_app"

echo "Starte Setup für Ideaboard..."

# --- Docker Compose starten ---
echo "Starte Docker-Container im Hintergrund..."
cd "$APP_DIR" || { echo "Fehler: Verzeichnis $APP_DIR nicht gefunden"; exit 1; }
sudo docker-compose up -d
if [ $? -eq 0 ]; then
    echo "Docker-Container laufen im Hintergrund."
else
    echo "Fehler beim Starten von Docker-Compose!"
fi

# --- Node.js Dev Server starten ---
echo "Starte Node.js Dev Server im Hintergrund..."
export DATABASE_URL="postgresql://root:root@127.0.0.1:5432/idea"
nohup npm run dev > "$APP_DIR/dev.log" 2>&1 &
if [ $? -eq 0 ]; then
    echo "Node.js Server läuft im Hintergrund. Logs in dev.log."
else
    echo "Fehler beim Starten von Node.js!"
fi

echo "Setup abgeschlossen. Alle Services laufen."

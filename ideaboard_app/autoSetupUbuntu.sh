gnome-terminal -- bash -c "cd git/ideaboard_masterplan/ideaboard_app;docker-compose up"; #sollte als Service starten

gnome-terminal -- bash -c "cd git/ideaboard_masterplan/ideaboard_app;psql postgresql://root:root@127.0.0.1:5432/idea;$"; #braucht man niet

gnome-terminal -- bash -c "DATABASE_URL=postgresql://root:root@127.0.0.1:5432/idea npm run dev"; exec bash; #sollte als Service starten


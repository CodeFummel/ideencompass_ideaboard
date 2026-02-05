docker-compose up -d

sleep 1

kitty @ launch --type os-window --title 'postgresql' sh -c "ls; exec bash"
kitty @ send-text --match 'title:postgresql' 'cd git/ideaboard_masterplan/ideaboard_app\n'
kitty @ send-text --match 'title:postgresql' 'psql postgresql://root:root@127.0.0.1:5432/idea\n'

DATABASE_URL=postgresql://root:root@127.0.0.1:5432/idea npm run dev

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Useful Commands

## To start the app

```bash
docker-compose up

DATABASE_URL=postgresql://root:root@127.0.0.1:5432/idea npm run dev

#to show the tables in the database:
psql postgresql://root:root@127.0.0.1:5432/`idea`

TABLE "<tables>";
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To migrate a new prisma schema

```bash
DATABASE_URL=postgresql://root:root@127.0.0.1:5432/idea npx prisma migrate dev --name <migration_name>

npx prisma generate

#if migration throws an error:
DATABASE_URL=postgresql://root:root@127.0.0.1:5432/idea npx prisma migrate reset
```

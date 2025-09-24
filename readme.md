# pokeChallenge 🕹️

A RESTful API built with **NestJS** to manage **Trainers**, **Teams**, and **Pokémon**, integrating with the public [PokéAPI](https://pokeapi.co/).

---

## 🚀 Tech Stack
- [NestJS](https://nestjs.com/) – Main framework
- [TypeORM](https://typeorm.io/) – ORM for relational database
- [PostgreSQL](https://www.postgresql.org/) – Database
- [Docker](https://www.docker.com/) – Containerized environment
- [Swagger](https://swagger.io/) – Interactive API documentation
- [Axios](https://axios-http.com/) – HTTP client to consume the PokéAPI

---

## 📂 Project Structure
```

src/
├─ trainers/       # Trainer CRUD
├─ teams/          # Team CRUD
├─ team-pokemon/   # Pokémon per Team
└─ pokeapi/        # Service for PokéAPI requests

````

---

## ⚙️ Requirements
- Node.js 18+ and npm
- Docker and docker-compose (recommended)

---

## 🐳 Quick Setup with Docker (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/pokemon-teams-api.git
cd pokemon-teams-api
````

2. **Start the database container**

```bash
docker-compose up -d
```

3. **Install dependencies and start the API**

```bash
npm install
npm run start:dev
```

The API will be running at **[http://localhost:3000](http://localhost:3000)**.

---

## 🛠️ Main Endpoints

### Trainers

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/trainers`     | Create a trainer    |
| GET    | `/trainers`     | List all trainers   |
| GET    | `/trainers/:id` | Get a trainer by ID |
| PATCH  | `/trainers/:id` | Update a trainer    |
| DELETE | `/trainers/:id` | Delete a trainer    |

### Teams

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/teams`                | Create a team for a trainer |
| GET    | `/teams?trainerId={id}` | List teams of a trainer     |
| PATCH  | `/teams/:id`            | Update a team               |
| DELETE | `/teams/:id`            | Delete a team               |

### Team Pokémon

| Method | Endpoint                      | Description                                          |
| ------ | ----------------------------- | ---------------------------------------------------- |
| POST   | `/teams/:teamId/pokemons`     | Add a Pokémon (validated against the PokéAPI)        |
| GET    | `/teams/:teamId/pokemons`     | List Pokémon of a team with enriched PokéAPI details |
| DELETE | `/teams/:teamId/pokemons/:id` | Remove a Pokémon from a team                         |

---

## 📖 Swagger Documentation

After starting the application, visit:

```
http://localhost:3000/api
```

for interactive API documentation.

---

## 🧪 Manual Testing

Use `curl`, [HTTPie](https://httpie.io/), or Postman.
Example:

```bash
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{"name":"Ash","cidadeOrigem":"Pallet"}'
```

---

## ⚡ Development Commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run start`     | Start the app in production mode     |
| `npm run start:dev` | Start the app in watch/development   |
| `npm run build`     | Compile TypeScript into `dist/`      |
| `npm run test`      | Run automated tests (if implemented) |

---

## 📜 License

MIT – free to use, modify and distribute.

---

### 📝 Notes

* Pokémon details (types, stats, sprites) are fetched live from the PokéAPI.
* Teams are limited to **6 Pokémon** each (configurable in the service layer).

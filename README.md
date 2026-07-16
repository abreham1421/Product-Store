# Product Store

A full-stack MERN catalog app — browse, add, edit, and retire products from a live MongoDB-backed store. Built as a CRUD learning project, redesigned into a portfolio-ready piece with a motion-driven UI, live search/sort, and real-time stock stats.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2-319795?logo=chakraui&logoColor=white)

## Features

- **Full CRUD** — create, edit, and delete products, backed by MongoDB Atlas
- **Live search & sort** — filter by name, sort by price (asc/desc), name, or newest, instantly, client-side
- **Real-time stock stats** — item count, average price, and top price computed live from the catalog
- **Skeleton loading states** — no blank flash while data is in flight
- **Animated catalog grid** — staggered entrance and smooth exit-on-delete via Framer Motion
- **Light / dark mode** — toggle in the navbar, persists per session
- **Responsive layout** — 1–3 column grid depending on viewport
- **Live image preview** — see the thumbnail render as you paste an image URL when adding a product
- **Instant UI updates** — all mutations reflect immediately via Zustand, no page reloads

## Tech stack

**Frontend** — React 18 (Vite), Chakra UI v2, Zustand, Framer Motion, React Router, React Icons
**Backend** — Node.js, Express, Mongoose, MongoDB Atlas
**Tooling** — dotenv, nodemon, cross-env, ESLint

## Project structure

```
MERN-CRASH-COURSE/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── product.controller.js # Route handlers (CRUD logic)
│   ├── models/
│   │   └── product.model.js      # Mongoose schema
│   ├── routes/
│   │   └── product.route.js      # /api/products routes
│   └── server.js                 # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── CreatePage.jsx
│   │   ├── store/
│   │   │   └── product.js        # Zustand store
│   │   ├── App.jsx
│   │   └── main.jsx               # Theme + ChakraProvider setup
│   └── vite.config.js
├── .env                           # not committed — see below
└── package.json
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or a local MongoDB instance)

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd MERN-CRASH-COURSE

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd frontend
npm install
cd ..
```

### Environment variables

Create a `.env` file in the project root:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

| Variable      | Description                                  |
| ------------- | --------------------------------------------- |
| `MONGODB_URI` | Your MongoDB Atlas (or local) connection string |
| `PORT`        | Port the Express server runs on (default 5000) |

> `.env` is git-ignored and should never be committed. If you're rotating a previously-exposed credential, update it in MongoDB Atlas first, then paste the new URI here.

### Running locally

Two terminals — the API and the frontend dev server run separately in development.

**Terminal 1 — backend:**
```bash
npm run dev
```
Starts the Express API on `http://localhost:5000` and connects to MongoDB.

**Terminal 2 — frontend:**
```bash
cd frontend
npm run dev
```
Starts the Vite dev server, typically on `http://localhost:5173`, proxying `/api` calls to the backend.

Open `http://localhost:5173` in your browser.

## Available scripts

**Root**

| Script          | Description                                      |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Runs the Express server with nodemon (dev mode)   |
| `npm run build` | Installs all deps and builds the frontend for production |
| `npm start`     | Runs the production server (serves built frontend) |

**`frontend/`**

| Script            | Description                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Starts the Vite dev server      |
| `npm run build`   | Builds the frontend for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint                     |

## API reference

Base URL: `/api/products`

| Method   | Endpoint | Description         | Body                                |
| -------- | -------- | -------------------- | ------------------------------------ |
| `GET`    | `/`      | Fetch all products    | —                                     |
| `POST`   | `/`      | Create a new product  | `{ "name": string, "price": number, "image": string }` |
| `PUT`    | `/:id`   | Update a product      | Any subset of `{ name, price, image }` |
| `DELETE` | `/:id`   | Delete a product       | —                                     |

All responses follow the shape:
```json
{ "success": true, "data": { "_id": "...", "name": "...", "price": 0, "image": "..." } }
```
or, on failure:
```json
{ "success": false, "message": "..." }
```

## Deployment

```bash
npm run build   # builds the React app into frontend/dist
npm start        # serves the API and the built frontend from one Express server
```
In production, Express serves the static frontend build and handles `/api/products` from the same server on `PORT`.

## Roadmap

Ideas for future iterations — not yet implemented:

- [ ] Image upload (instead of pasting a URL)
- [ ] Categories / tags and filtering by category
- [ ] Pagination for large catalogs
- [ ] Authentication for who can add/edit/delete
- [ ] Cart + checkout flow

## License

MIT — feel free to adjust or remove depending on how you want to license this repo.

## Author

**Abreham**
Built as part of a self-directed MERN stack learning project.
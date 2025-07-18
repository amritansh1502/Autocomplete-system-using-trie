# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# Autocomplete Backend

This project includes a backend server for an autocomplete system. The backend is built with Node.js and Express, and uses a trie data structure to efficiently search sentences by prefix.

## Key Components

- `server/index.js`: Express server that loads sentences and provides a search API.
- `server/trie.js`: Implementation of the SentenceTrie data structure.
- `server/words.txt`: Contains 1000 simple sentences about technology, animals, and fruits used for autocomplete.

## Running the Backend Server

1. Navigate to the `server` directory.
2. Install dependencies with `npm install`.
3. Start the server with `node index.js`.
4. The server runs on port 5000 by default.

## Autocomplete API

- Endpoint: `/search?q=your_query`
- Returns a JSON array of sentences starting with the query prefix.

## Notes


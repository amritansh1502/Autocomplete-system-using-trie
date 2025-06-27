const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Trie = require('./trie');

const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());

// Initialize Trie and load words
const trie = new Trie();
const wordsFilePath = path.join(__dirname, 'words.txt');
const words = fs.readFileSync(wordsFilePath, 'utf-8').split(/\r?\n/);
words.forEach(word => {
  if (word.trim()) {
    trie.insert(word.trim());
  }
});

app.get('/', (req, res) => {
  res.send('Autocomplete System Backend is running');
});

// Search API endpoint
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  if (!query) {
    return res.json([]);
  }
  const results = trie.getWordsWithPrefix(query);
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

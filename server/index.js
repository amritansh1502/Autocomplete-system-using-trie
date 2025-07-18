const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const SentenceTrie = require('./trie');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SentenceTrie and load sentences
const trie = new SentenceTrie();
const sentencesFilePath = path.join(__dirname, 'words.txt');
const sentences = fs.readFileSync(sentencesFilePath, 'utf-8').split(/\r?\n/);
sentences.forEach(sentence => {
  if (sentence.trim()) {
    trie.insert(sentence.trim());
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
  const results = trie.getSentencesWithPrefix(query);
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

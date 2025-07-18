class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfSentence = false;
    this.sentences = new Set();
  }
}

class SentenceTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(sentence) {
    const lowerSentence = sentence.toLowerCase();
    let node = this.root;
    for (let char of lowerSentence) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
      node.sentences.add(sentence);
    }
    node.isEndOfSentence = true;
  }

  getSentencesWithPrefix(prefix) {
    const lowerPrefix = prefix.toLowerCase();
    let node = this.root;
    for (let char of lowerPrefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    return Array.from(node.sentences);
  }
}

module.exports = SentenceTrie;

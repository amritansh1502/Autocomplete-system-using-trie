class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  getWordsWithPrefix(prefix) {
    const results = [];
    const dfs = (node, path) => {
      if (node.isEndOfWord) results.push(path.toLowerCase());
      for (let char in node.children) dfs(node.children[char], path + char);
    };

    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    dfs(node, prefix.toLowerCase());
    return results;
  }
}

module.exports = Trie;

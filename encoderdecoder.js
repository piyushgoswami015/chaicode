const readline = require('readline');

const tokenMap = new Map();
const reverseTokenMap = new Map();
let currentId = 1;

function getTokenId(token) {
  if (!tokenMap.has(token)) {
    tokenMap.set(token, currentId);
    reverseTokenMap.set(currentId, token);
    currentId++;
  }
  return tokenMap.get(token);
}

function encodeString(str) {
  const tokens = str.match(/\s+|\w+|[^\w\s]/g);
  if (!tokens) return '';
  const tokenIds = tokens.map(getTokenId);
  return tokenIds.join(',');
}

function decodeString(encodedStr) {
  const ids = encodedStr.split(',').map(id => parseInt(id, 10));
  const tokens = ids.map(id => reverseTokenMap.get(id) || '');
  return tokens.join('');
}

// === Use readline for input ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your custom input: ", (input) => {
  const encoded = encodeString(input);
  console.log("Encoded:", encoded);

  const decoded = decodeString(encoded);
  console.log("Decoded:", JSON.stringify(decoded)); // JSON.stringify to show spacing/newlines

  rl.close();
});

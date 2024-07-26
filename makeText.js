/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function createMarkovText(input) {
  const markovChain = new markov.MarkovMachine(input);
  console.log(markovChain.generateText());
}

function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (error, content) => {
    if (error) {
      console.error(`File read error: ${filePath}: ${error}`);
      process.exit(1);
    } else {
      createMarkovText(content);
    }
  });
}

async function processURL(url) {
  try {
    const response = await axios.get(url);
    createMarkovText(response.data);
  } catch (error) {
    console.error(`URL fetch error: ${url}: ${error}`);
    process.exit(1);
  }
}

const [inputType, source] = process.argv.slice(2);

switch (inputType) {
  case 'file':
    processFile(source);
    break;
  case 'url':
    processURL(source);
    break;
  default:
    console.error(`Invalid input type: ${inputType}`);
    process.exit(1);
}
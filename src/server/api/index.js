const express = require('express')
const app = express()


let text_index_path = __dirname + '/data/text_indexes/';
let index_path = __dirname + '/data/invertedIndexes/';
let words_path = __dirname + '/data/word_indexes/';
let JSON_text_path = __dirname + '/data/tokenized_pages/';
let searcher;
import('./searcher/search.mjs').then((module) => {
  searcher = module.make_Searcher(text_index_path, index_path, words_path, JSON_text_path);
});

app.get('/search/:id', (req, res) => {
  const { id:string } = req.params;

  searcher.search(string);
  
  let results=[];
  for(let id of searcher.result())  {
    let preview = searcher.retrieve_preview(id,50);
    if(preview.description === null)
      preview.description = "Sem descrição: Página pertecente a complemento do conjunto universo!"
    results.push(preview);
  }
  console.log(string);

  res.status(200).send(results);
});

module.exports = {
  path: '/api/',
  handler: app
}
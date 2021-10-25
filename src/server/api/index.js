const express = require('express')
const app = express()




app.get('/search/:id', (req, res) => {
  const { string } = req.params;
  let text_index_path = dirname + '/data/text_indexes/';
  let index_path = dirname + '/data/invertedIndexes/';
  let words_path = dirname + '/data/word_indexes/';
  let JSON_text_path = dirname + '/data/tokenized_pages/';
  let searcher;
  import('/searcher/search.mjs').then((module) => {
    searcher = module.make_Searcher(text_index_path, index_path, words_path, JSON_text_path);
  });

  searcher.search(string);
  let results=[];
  for(let id of searcher.result())  {
    let preview = searcher.retrieve_preview(id,10);
    if(preview.description === null)
      preview.description = "Sem descrição: Página pertecente a complemento do conjunto universo!"
    results.push(preview);
  }

  res.status(200).send(results);
});

function search(busca){

  return [
    {name: `What is Lorem Ipsum? ${busca}`, url: "https://google.com", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryzs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {name: `Why do we use it? ${busca + "B2"}`, url: "https://google.com", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"}
  ];
}

module.exports = {
  path: '/api/',
  handler: app
}
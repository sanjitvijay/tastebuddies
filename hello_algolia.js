// hello_algolia.js
const algoliasearch = require('algoliasearch')

// Connect and authenticate with your Algolia app
const client = algoliasearch('E8NMS63GYJ', 'cb799472817a936c01d8d0c5cb86539c')

// Create a new index and add a record
const index = client.initIndex('reviews')


// Search the index and print the results
index
  .search('veggie')
  .then(({ hits }) => console.log(hits))
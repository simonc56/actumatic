const Parser = require('rss-parser');

const parser = new Parser();

// run this file with 'npx tsx apps/backend/src/app/infrastructure/external/manually-test.js'
// change this url to test different rss feeds
const url = 'http://www.zdnet.fr/feeds/rss/actualites/';

async function fetch() {
  const feed = await parser.parseURL(url);
  return feed.items.map((item) => ({
    title: item.title || '',
    url: item.link || '',
    providerId: '123-456',
    createdAt: new Date(item.pubDate || Date.now()),
  }));
}

fetch().then((news) => {
  // result must be an array of objects with correct title, url and date
  console.log(news);
});

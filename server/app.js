const express = require('express');
const unknownEndpoint = require('./middlewares/errorHandler')
const ebayScraper = require('./ebay');
const aliExpressScraper = require('./aliexpress')
const fs = require('fs');

const app = express();
app.use(express.json());


//mock data for testing
const aliexpressMock = JSON.parse(fs.readFileSync('./aliexpressMock.json'));
const ebayMock = JSON.parse(fs.readFileSync('./ebayMock.json'));
const data = { aliexpressMock, ebayMock }

app.get('/ebay', async (req, res) => {
console.log('Scraping Ebay...')
const { product } = req.query;
try {
const results = await ebayScraper(product, ['United States'])
console.log(results)
return res.send(results)
} catch(err) {
console.log('failure', err)
return res.send(err)
}
});

app.get('/aliexpress', async (req, res) => {
console.log('Scraping AliExpress...')
const { product } = req.query;
try {
const results = await aliExpressScraper(product, ['United States'])
return res.send(results)
} catch(err) {
console.log('failure', err)
return res.send(err)
}
});


app.get('/ebayMock', async (req, res) => {
    return res.send(data.ebayMock)
    });
    
    app.get('/aliexpressMock', async (req, res) => {
    return res.send(data.aliexpressMock)
    });
    

app.use(unknownEndpoint);

module.exports = app;
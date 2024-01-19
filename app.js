const express = require('express');
const bodyParser = require('body-parser');
const News = require('./models/News');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all news
app.get('/news', (req, res) => {
  News.getAllNews((err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

// Add new news
app.post('/news', (req, res) => {
  const newsData = req.body;

  News.addNews(newsData, (err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.json({ message: 'News added successfully', result });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
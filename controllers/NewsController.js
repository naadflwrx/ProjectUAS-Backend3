const express = require('express');
const News = require('../models/News');

const router = express.Router();

// Get all berita
router.get('/news', (req, res) => {
  News.getAllNews((err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: 'Menampilkan seluruh berita', data: result });
      } else {
        res.status(200).json({ message: 'Data is empty', data: [] });
      }
    }
  });
});

// Add new news
router.post('/news', (req, res) => {
  const newsData = req.body;

  if (!newsData.judul || !newsData.penulis || !newsData.konten || !newsData.url || !newsData.urlImage || !newsData.kategori) {
    res.status(422).json({ message: 'All fields must be filled correctly', data: null });
  } else {
    News.addNews(newsData, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
      } else {
        res.status(201).json({ message: 'News added successfully', data: result });
      }
    });
  }
});

// Update a news
router.put('/news/:id', (req, res) => {
  const newsId = req.params.id;
  const updatedData = req.body;

  News.updateNews(newsId, updatedData, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      if (result.affectedRows > 0) {
        // Berita berhasil diupdate
        res.status(200).json({ message: 'News updated successfully', data: updatedData });
      } else {
        // Resource tidak ditemukan
        res.status(404).json({ message: 'Resource not found', data: null });
      }
    }
  });
});

// Delete a news
router.delete('/news/:id', (req, res) => {
  const newsId = req.params.id;

  News.deleteNews(newsId, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      if (result.affectedRows > 0) {
        // Berita berhasil dihapus
        res.status(200).json({ message: 'Resource is deleted successfully', data: null });
      } else {
        // Resource tidak ditemukan
        res.status(404).json({ message: 'Resource not found', data: null });
      }
    }
  });
});

// Get one news
router.get('/news/:id', (req, res) => {
  const newsId = req.params.id;

  News.getOneNews(newsId, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      if (result.length > 0) {
        // Berita ditemukan
        res.status(200).json({ message: 'Single resource retrieved successfully', data: result[0] });
      } else {
        // Resource tidak ditemukan
        res.status(404).json({ message: 'Resource not found', data: null });
      }
    }
  });
});

// Search news
router.get('/news/search/:tittle', (req, res) => {
  const tittle = req.params.tittle;

  News.searchNews(tittle, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      if (result.length > 0) {
        // Berita ditemukan
        res.status(200).json({ message: 'Search results retrieved successfully', data: result });
      } else {
        // Berita tidak ditemukan
        res.status(404).json({ message: 'Resource not found', data: null });
      }
    }
  });
});

// Get sports news
router.get('/news/category/sport', (req, res) => {
  News.getSportsNews((err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      const totalSportsNews = result.length;
      res.status(200).json({ message: 'Total sports news retrieved successfully', total: totalSportsNews });
    }
  });
});

// Get finance news
router.get('/news/category/finance', (req, res) => {
  News.getFinanceNews((err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      res.status(200).json({ message: 'Get finance with data', data: result });
    }
  });
});

// Get automotive news
router.get('/news/category/automotive', (req, res) => {
  News.getAutomotiveNews((err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    } else {
      const totalAutomotiveNews = result.length;
      res.status(200).json({
        message: 'Get automotive',
        total: totalAutomotiveNews,
        data: result
      });
    }
  });
});

// membuat object NewsController
const object = new NewsController();

// export object NewsController
module.exports = object;

const express = require("express");
const Journal = require("../models/Journals");

const router = express.Router();

router.get('/user', async (req, res) => {
  try {

    const journals = await Journal.find({ hide: false }).sort({ publishedAt: -1 });

    const result = journals.map(j => ({
      _id: j._id,
      title: j.title,
      description: j.description,
      hide: j.hide,
      pdfUrl: `${req.protocol}://${req.get('host')}/uploads/journals/${j.filename}`,
      publishedAt: j.publishedAt
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin', async (req, res) => {
  try {

    const journals = await Journal.find().sort({ publishedAt: -1 });

    const result = journals.map(j => ({
      _id: j._id,
      title: j.title,
      description: j.description,
      hide: j.hide,
      pdfUrl: `${req.protocol}://${req.get('host')}/uploads/journals/${j.filename}`,
      publishedAt: j.publishedAt
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

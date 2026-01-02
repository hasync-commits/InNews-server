const express = require("express");
const multer = require("multer");
const Journal = require("../models/Journals");
const router = express.Router();


const authMiddleware = require('../middleware/auth.middleware');
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome Admin', userId: req.userId });
});

// ===== Multer configuration =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/journals/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + ".pdf");
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDFs allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});


//protect this route with authentication middleware
router.post("/upload", (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { title, description } = req.body;

      if (!title || !req.file) {
        return res.status(400).json({ error: "Title and PDF are required" });
      }

      const journal = new Journal({
        title,
        description,
        filename: req.file.filename,
        path: req.file.path,
        author: "Admin Journalist",
        hide:req.file.hide,
      });

      await journal.save();
      res.status(201).json({ message: "Journal uploaded successfully" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});


// DELETE /api/journals/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    res.json({ message: 'Journal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/journals/hide/:id
router.patch('/hide/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hide } = req.body; // expect { hide: true } or { hide: false }

    if (typeof hide !== 'boolean') {
      return res.status(400).json({ error: 'hide must be a boolean value' });
    }

    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    journal.hide = hide;
    await journal.save();

    res.json({
      message: `Journal hide set to ${journal.hide}`,
      _id: journal._id,
      title: journal.title,
      hide: journal.hide
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//get all books

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//get 1 book by ID

router.get('/:bookID', async (req, res) => {
  const book = await Book.findById(req.params.bookID);
  res.json(book);
});

//add book

router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    authors: req.body.authors,
    publisher: req.body.publisher,
    publishDate: req.body.publishDate,
  });
  try {
    const savedbook = await book.save();
    res.json({ book: savedbook });
  } catch (err) {
    res.json({ message: err });
  }
});

//delete book

router.delete('/:bookID', async (req, res) => {
  try {
    const deletedBook = await Book.deleteOne({ _id: req.params.bookID });
    res.json(deletedBook);
  } catch (err) {
    res.json({ message: err });
  }
});

//update book

router.patch('/:bookID', async (req, res) => {
  try {
    await Book.updateOne(
      { _id: req.params.bookID },
      { $set: { authors: req.body.authors } }
    );
    res.json({ updated: req.params.bookID });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

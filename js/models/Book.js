const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
  },
  publisher: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Books', BookSchema);

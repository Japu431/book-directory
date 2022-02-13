const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    name: String,
    price: Number
})

module.exports = Book;
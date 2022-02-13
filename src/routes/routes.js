const express = require('express')
const routes = express.Router();
const Book = require('../config/db')

routes.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ message: `Erro ao listar livros!! ${error}` })
    }
})

routes.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const book = await Book.find({ _id: id })

        if (!book) {
            res.status(422).json({ message: `Não foi possível achar o livro desejado!!` })
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: `Erro ao achar livro!! ${error}` })

    }

})


routes.post('/create', async (req, res) => {

    const { name, price } = req.body;

    if (!name) {
        res.status(422).json({ message: `Nome do livro deve ser preenchido!` })
    }

    const book = {
        name, price
    }

    try {
        await Book.create(book);
        res.status(201)
            .json({ message: "Livro inserido no sistema com sucesso!!" });
    } catch (error) {
        res.status(400).json({ message: `Erro ao criar livro!! ${error}` })
    }

})


routes.put('/:id', async (req, res) => {
    const id = req.params.id
    const { name, price } = req.body;
    const book = { name, price }

    try {
        const bookUpdate = await Book.updateOne({ _id: id }, book);

        if (bookUpdate.matchedCount == 0) {
            res.status(422).json({ message: `O livro não foi encontrado!!` });
            return
        }

        res.status(200).json(book)

    } catch (error) {
        res.status(400).json({ message: `Erro ao atualizar livro!! ${error}` })

    }
})

routes.delete('/:id', async (req, res) => {
    const id = req.params.id

    const book = await Book.find({ _id: id });

    if (!book) {
        res.status(422).json({ message: `O livro não foi encontrado!!` });
        return
    }

    try {
        await Book.deleteOne({ _id: id })
        res.status(200).json({ message: `Sucesso ao deletar livro!!` })
    } catch (error) {
        res.status(400).json({ message: `Erro ao deletar livro!! ${error}` })
    }
})

module.exports = routes 
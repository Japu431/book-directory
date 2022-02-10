const express = require('express')
const routes = express.Router();
const uuid = require('uuid').v4();


const books = [
    {
        id: uuid,
        name: "as seis lições",
        price: 60.99
    },
    {
        id: uuid,
        name: "Mentalidade anticapitalista",
        price: 40.50
    }
];


routes.get('/', (req, res) => {
    try {
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ message: `Erro ao listar livros!! ${error}` })
    }
})

routes.get('/:id', (req, res) => {
    const id = req.params
    const search = books.find(value => {
        value = id.id
        return value
    })

    try {
        res.status(200).json(search);
    } catch (error) {
        res.status(400).json({ message: `Erro ao achar livro!! ${error}` })

    }

})

routes.post('/create', (req, res) => {
    const { name, price } = req.body;
    const book = books.find(vals => {
        return vals.name
    })

    if (name == book) {
        return console.error(new Error(`Livro já existente!!`))
    }

    books.push({
        id: uuid,
        name: name,
        price: price
    });


    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: `Erro ao criar livro!! ${error}` })
    }

})

module.exports = routes 
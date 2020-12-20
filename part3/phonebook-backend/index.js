const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
require('dotenv').config()
const Person = require('./models/person')


morgan.token('bodycontent', (req) => { return JSON.stringify(req.body) }) //fixed return statement
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodycontent'))


app.get('/api/persons', (req, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(p => {
        res.send(`<p>Phonebook has info for ${p.length} people</p><p>${new Date()}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(p => {
        if (p) {
            response.json(p)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    let opts = {
        runValidators: true,
        context: 'query'
    }

    Person.findByIdAndUpdate(request.params.id, person, opts)
        .then(() => {
            Person.findById(request.params.id).then(updated =>
                response.json(updated.toJSON()))
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    Person.find({}).then(() => {

        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
            .catch(error => next(error))
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port http://127.0.0.1:${PORT}`)
})



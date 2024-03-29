const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.use(cors())
app.use(express.json())


morgan.token('post_body', function (request, response) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return null;
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const ans = `Phonebook has info for ${persons.length} people<br/>${new Date().toString()}`
  response.send(ans)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const personToDelete = persons.find(p => p.id === id)
  if (!personToDelete) {
    return response.status(404).end()
  }
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 1000_000) + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
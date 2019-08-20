//declare express:
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}


//Get request on ./:
app.get('/', (request, response) =>{
    response.send('<h1>Hiya! Head on over to /api/persons.</h1>')
})

//Get-request for /api/persons:
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Get-request for /info: 
app.get('/info', (request, response) => {
    let personsNum = persons.length
    let date = new Date()
    let stringResponse = `<p2>Phonebook has info for ${personsNum} people.</p2><br><p2>${date}</p2>`
    response.send(stringResponse)
    
})

//Get-request for individual items: 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

//Delete-request for phonebook-entry: 
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person !== id)
    response.status(204).end()
})

//post-request for /api/persons: 
app.post('/api/persons', (request, response) => {
    const body = request.body
    if ((!body.name) || (!body.number)){
        return response.status(400).json({
            error : "Name AND Number must be submitted."
        })
    }
    let existingPerson = persons.find(p => p.name === body.name)
    if (existingPerson){
        return response.status(400).json({
            error : 'name must be unique.'
        })
    }
    const person = {
        name : body.name,
        number : body.number,
        id : generateId()
    }
    console.log(person)
    persons = persons.concat(person)
    response.json(person)
})

let persons = [
    {
        name : "Arto Hellas",
        number : "040-123456",
        id : 1
    }, 
    {
        name : "Ada Lovelace", 
        number : "39-44-5323523", 
        id : 4
    }, 
    {
        name : "Dan Abramov", 
        number: "12-43-234345", 
        id : 3
    }, 
    {
        name : "Mary Poppendieck", 
        number: "39-23-6423122",
        id : 4
    }
]


const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`)
})
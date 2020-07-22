const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://fullstacknauraa:${password}@nauraa.dkz5t.azure.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
}


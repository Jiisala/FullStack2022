import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import ShowPersons from './components/ShowPersons'
import personService from './services/Persons'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{
    personService
      .getAll()
        .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.find(person => person.name === newName)){
      const id = persons.find(person => person.name === newName).id
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        personService
        .update(id, personObject)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person: returnedPerson))})
      
      setMessage(`${newName} was updated`)
        setTimeout(() => {
          setMessage(null)
        },5000)}
    }
    else {personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`${newName} was added to phonebook`)
        setTimeout(() => {
          setMessage(null)
        },5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          
        })
        
       
      }
      
    setNewName('')
    setNewNumber('')
  }
  const deletePerson =(id) =>{
    const personToName = persons.find(person => person.id ===id)
    if (window.confirm(`Delete ${personToName.name} ?`)){
    personService
      .remove(id)
      .then(() => {
      setPersons(persons.filter(person => person.id !== id))  
      })
    .catch(error => {
      console.log('poisto', error.response.data.error)
      setErrorMessage(
        error.response.data.error
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })  
  }}

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)


  }
  const perosonsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      
      <h2>add a new</h2>
      <Message message ={message}/>
      <ErrorMessage className= 'errorMessage' errorMessage ={errorMessage}/>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ShowPersons
        perosonsToShow={perosonsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
import './App.css';
import { useState, useEffect } from 'react'
import ShowPersons from './components/ShowPersons';
import SearchForContact from './components/SearchForContact';
import AddNewContact from './components/AddNewContact.js';
import contactService from './services/contactService';


const returnLowerCase = (word) => {
  return word.toLowerCase();
}
function App() {
  const [persons, setPersons] =useState([]);
  const [newContact, setNewContact] = useState(''); 
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchForName, setSearchForName] = useState('');
  

  const hook = () => {
    contactService
      .getAll()
      .then(contactResponse => {
        console.log('promise fulfilled')
        setPersons(contactResponse)
      })
      .catch(error => {
        console.log('failed at getting data from backend')
      })
  };
  useEffect(hook, []);
  
  const addContact = (event) => {
    event.preventDefault();
    for(let i = 0; i < persons.length; i++)
    {
      if(returnLowerCase(persons[i].name) === returnLowerCase(newContact))
        return window.alert(`${newContact} is already in the phonebook.`);
    }
      
    const contactObject = {
      name: newContact,
      id: persons.length + 1,
      number: newNumber
    }
    contactService
    .create(contactObject)
    .then(response => {
      console.log(response);
      setPersons(persons.concat(contactObject));
      setNewNumber('');
      setNewContact('');
    
    })
    .catch(error => {
      console.log('failed at creating object')
    });
    
  }
  const findContact = (event) => {
    event.preventDefault();  
    setShowAll(false);
  }
  const handleSearchContactChange = (event) => {
    setSearchForName(event.target.value);
  }
  const handleContactChange = (event) => {
    console.log(event.target.value);
    setNewContact(event.target.value);
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }
 

  return (
    <div className = "main">
      <div className ="ui-container">
        <h2>Phonebook</h2>
        <SearchForContact searchForName={searchForName} handleSearchContactChange={handleSearchContactChange} findContact = {findContact} />
        <AddNewContact addContact = {addContact} newContact={newContact} handleContactChange={handleContactChange} handleNumberChange={handleNumberChange} />
      </div>
      
      <div className="data-container">
        <ShowPersons persons = {persons} showAll = {showAll}  searchForName = {searchForName} />
      </div>
    </div> 
  );
}

export default App;

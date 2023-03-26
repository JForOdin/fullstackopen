import './App.css';
import { useState } from 'react';
import ShowPersons from './components/ShowPersons';
import SearchForContact from './components/SearchForContact';
import AddNewContact from './components/AddNewContact.js';

const returnLowerCase = (word) => {
  return word.toLowerCase();
}
function App(props) {

  const [persons, setPersons] = useState(props.persons);
  const [newContact, setNewContact] = useState(''); 
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchForName, setSearchForName] = useState('');
  
  const addContact = (event) => {
    event.preventDefault();
    for(let i = 0; i < persons.length; i++)
    {
      if(returnLowerCase(persons[i].name) == returnLowerCase(newContact))
        return window.alert(`${newContact} is already in the phonebook.`);
    }
      
    const contactObject = {
      name: newContact,
      id: persons.length + 1,
      number: newNumber
    }
    setPersons(persons.concat(contactObject));
    setNewNumber('');
    setNewContact('');
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
        <ShowPersons persons = {persons} showAll = {showAll} searchForName = {searchForName}/>
      </div>
    </div> 
  );
}

export default App;

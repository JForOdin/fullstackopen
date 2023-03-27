
import contactService from '../services/contactService';


 
const DeleteButton = ({onClick,id,name,props}) => {
  const deleteContact = (props) => {
    if(window.confirm("Delete id "+name+" ?"))
    {
      console.log("Called delete contact on id ",props.target.id);
      contactService.deleteContact(props);
    }
  }
  return (<button onClick={deleteContact} id={id}>delete</button>);
}
const ShowPersons = (props) => {
    console.log("Called show persons");
    const contactsToShow = props.showAll
    ? props.persons
    : props.persons.filter(person => person.name.startsWith(props.searchForName));
    return (
      <div>
        <h3>Contacts</h3>  
        {contactsToShow.map((person)=><div key = {person.name} className = "person-div">{person.name} - 
        {" "}{person.number}<DeleteButton id={person.id} name = {person.name} /></div>)}
      </div>
    )
} 
export default ShowPersons;
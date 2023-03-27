import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
  
}

const deleteContact = (props) => {
  console.log("Deleting contact ",props.target.id)
  const request = axios.delete(`${baseUrl}/${props.target.id}`)
  .catch(error => {
    alert(
      `the contact '${props.target.id}' was already deleted from server`
    )
  })
  return request;
}
const create = newObject => {
  return axios.post(baseUrl, newObject)
}
const changeContactNumber = (props) => {
  
}
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll, 
  create, 
  deleteContact,
  update
}
import './App.css';
import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]


const getRandomNumber = () =>
{
  let number = Math.floor(Math.random()*8);
  return number;
}
const getHighestVote = (props) => {
  let highestVote = 0;
  let highestVoteIndex = -1;
  for(let i = 0; i < props.voteArray.length;i++)
  {
    if(props.voteArray[i] > highestVote)
    {
      highestVoteIndex = i;
      highestVote = props.voteArray[i];
    }
  }
 // console.log("highest voted : "+highestVote);
 // console.log("highest index value : "+highestVoteIndex);

  return (
    <div>
      Highest Voted Quote: {props.anecdotes[highestVoteIndex]}
    </div>
  )
}
const MostVotes = (props) =>
{
  console.log("votes array",props.voteArray)
  if(props.votes>0)
  {
    return getHighestVote(props);
  }
  return (
    <div>No votes currently</div>
  )
}

const App = () => {
  
  const clickVote = (props)=> {

    let currentValue = votearray[props];
    votearray[props] +=1;
    setSelected(getRandomNumber);
    setTotalVotes(totalVotes+1);
  }
  

  const [selected, setSelected] = useState(0);
  const [votearray]= useState([]);
  const [highestVoted,setHighestVoted] = useState(0);
  const [totalVotes,setTotalVotes] = useState(0);
  let currentNumber = getRandomNumber();
  
  if(votearray.length===0)
    for(let i = 0; i < anecdotes.length; i++)
      votearray.push(0);
  return (
    <div>
      <div>
      <h2>{anecdotes[currentNumber]}</h2>
      </div>
      <div>
        Has {votearray[currentNumber]} votes
      </div>
      <div id = "main">
        <button onClick={()=> clickVote(currentNumber)}>vote</button>
        <button onClick={setSelected}>next anecdote</button>
        <MostVotes votes = {totalVotes} voteArray={votearray} anecdotes={anecdotes} highestVoted={highestVoted}/>
      </div>
    </div>
  )
}

export default App
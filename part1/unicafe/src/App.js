import {useState} from 'react';
import './App.css';

const Header = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}
const Button = (props) =>  (
  <button onClick={props.handleClick} >{props.text}</button>
)
const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const Statistics = (props) => {
  //console.log("stat props",props.good);
  if(props.totalVotes>0)
  {
    return(
      <div>
        <h2>
        Statistics
        </h2>
        <StatisticLine text="Good" value ={props.good} />
        <StatisticLine text="Neutral" value ={props.neutral} />
        <StatisticLine text="Bad" value ={props.bad} />
      </div>
   )
  }
  return (
    <div>
      <h3>No Feedback Given</h3>
    </div>
  )
}
const AdditionalStats = (props) => {
  if(props.totalVotes>0)
  {
    return (
      <div>
        <div>
        Total Votes: {props.totalVotes}
        </div>
        <div>
          Average Score: {props.score/props.totalVotes}
        </div>
        <div>
          Positive Scores: {props.positiveScore/props.totalVotes*100} %
        </div>
      </div>
    )
  }
  
} 
function App() { 
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [score, setScore] = useState(0);
  const [positiveScore, setPositiveScore] = useState(0);
  
  const clickGood = (prop) => {
    setGood(prop);
    setTotalVotes(totalVotes+1);
    setScore(score+1);
    setPositiveScore(positiveScore+1);
  }
  const clickNeutral = (prop) => {
    setNeutral(prop);
    setTotalVotes(totalVotes+1);

  }
  const clickBad = (prop) => {
   // console.log("handle click",prop)
    setBad(prop);
    setTotalVotes(totalVotes+1);
    setScore(score-1);
  }
 
  
  
  
  return (
    <div className="App">
      <Header />
        <Button handleClick={() => clickGood(good+1)} text="good"/>
        <Button handleClick={() => clickNeutral(neutral+1)} text="neutral"/>
        <Button handleClick={() => clickBad(bad+1)} text="bad"/>
        <Statistics good={good} neutral = {neutral} bad = {bad} totalVotes={totalVotes}/>
        <AdditionalStats totalVotes = {totalVotes} score = {score} positiveScore={positiveScore}/>
    </div>
  );
}

export default App;

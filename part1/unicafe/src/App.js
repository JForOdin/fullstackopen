import {useState} from 'react';
import './App.css';

const Button = (props) => {
  <button onClick={props.handleClick}>{props.text}</button>
}
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total,setTotals] = useState(0);
  const [average,setAverage] = useState(0);
  const [score,setScore] = useState(0);
  const [positive,setPositive] = useState(0);
  const Header = () => {
    return (
      <div>
        <h1>Give Feedback</h1>
      </div>
    )
  }
  return (
    <div className="App">
      <Header />
      <Button handleClick={()=>setGood(200 )} text="good" />
    </div>
  );
}

/*
const PositiveReviews = (props) => {
  if(props.positives.total!=0)
  {
    return (
      <div>
        Positive reviews: {props.positives.positive}
      </div>
    )
  }
  return (
    <div>
      
    </div>
  )
}
const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <div>
        Good: {props.stats.good} 
      </div>
      <div>
        Neutral: {props.stats.neutral}
        </div>
      <div> 
        Bad: {props.stats.bad}
      </div>
      <div>
        Total Votes: {props.stats.total}
      </div>
      <div>
        Average Score: {props.stats.average}
      </div>
      <div>
      </div>
    </div>
  )
}
const Button = ({ handleClick,text }) => (
  <button onClick={handleClick}>
   {text}
  </button>
)
const Buttons = (props) =>{
  return (
    <div>
      <Button handleClick={clickGood} text = "good" prop = {props.prop.setGood,props.prop.good,props.prop.setTotals,props.prop.total,props.prop.setScore,props.prop.score,props.prop.setAverage,props.prop.average}/>
      <Button handleClick={clickNeutral} text = "neutral"/>
      <Button handleClick={clickBad} text = "bad"/>
    </div>
  )
}
const clickGood = (props) => {
  props.prop.setGood(props.prop.good+1);
  props.prop.setTotals(props.prop.total+1);
  props.prop.setScore(props.prop.score+1);
  props.prop.setAverage(props.prop.score/props.prop.total);
  props.prop.setPositive(props.prop.positive+1);
}
const clickNeutral = (props) => {
  props.prop.setNeutral(props.prop.neutral+1);
  props.prop.setTotals(props.prop.total+1);
 props.prop.setAverage(props.prop.score/props.prop.total);


}
const clickBad = (props) => {
  props.prop.setBad(props.prop.bad+1);
  props.prop.setTotals(props.prop.total+1);
  props.prop.setScore(props.prop.score-1);
  props.prop.setAverage(props.prop.score/props.prop.total);


}
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total,setTotals] = useState(0);
  const [average,setAverage] = useState(0);
  const [score,setScore] = useState(0);
  const [positive,setPositive] = useState(0);



const Header = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}


  return (
    <div className="App">
      <Header />
      { <Button handleClick={(clickGood)} text = "good" prop = {setGood,good,setTotals,total,setScore,score,setAverage,average}/> }
      <Button handleClick={() => setGood } text = "good" />
      { <Buttons prop = {setGood,good,setNeutral,neutral,setBad,bad,setTotals,total,setScore,score,setAverage,average}/> }
      { <Statistics stats = {good,neutral,bad}/> }
    </div>
  );
}
*/
export default App;

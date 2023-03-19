import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <div>
        {props.parts[0].name}
      </div>
      <div>
        {props.parts[1].name}
      </div>
      <div>
        {props.parts[2].name}
      </div>

    </div>
  )
}
const Total = (props) => {
 let totalTotal = 0;
 for(let i = 0; i < props.parts.length;i++)
 {
   totalTotal+=props.parts[i].exercises;
 }
  return (
    <div>
      <p>Total Number of Exercises:</p>
      {totalTotal}
    </div>
  )
}

const App = () => {

  const name = "Peter";
  const age = 10;
  const showTestFunction = false;
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
        <Header course ={course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
       
    </div>
  )
} 

export default App
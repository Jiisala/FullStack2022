import { useState } from 'react'

const StatisticLine = (props) =>{
  return(<tr><td>{props.name}</td><td> {props.counter} {props.mark}</td></tr>)
}
const Button = (props) => {
  return ( 
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const Statistics = (props) =>{
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral +bad !== 0){
  return(
    <table>
      <tbody>
    <StatisticLine name = 'good' counter ={good}/>
    <StatisticLine name = 'neutral' counter ={neutral}/>
    <StatisticLine name = 'bad' counter ={bad}/>
    <StatisticLine name = 'all' counter ={good + neutral + bad}/>
    <StatisticLine name = 'average' counter ={(good - bad)/(good +neutral + bad)}/>
    <StatisticLine name = 'positive' counter ={good/(good + neutral + bad)*100} mark = '%'/>
    </tbody>
    </table>
  )
  }
  return(
    <div>
      No feedback given
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    
    <div>
      
      <h1>give feedback</h1>
      <Button handleClick ={() => setGood(good+1)} text = 'good'/>
      <Button handleClick ={() => setNeutral(neutral+1)} text = 'neutral'/>
      <Button handleClick ={() => setBad(bad+1)} text = 'bad'/>
      <h1>Statistics</h1>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      
    </div>
    
  )
  
}

export default App
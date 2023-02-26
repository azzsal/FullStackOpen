import { useState } from 'react'

const Heading = ({ text }) => {
  return (
    <h2>
      {text}
    </h2>
  )
}

const Button = ({ handler, text }) => {
  return ( 
    <button onClick={handler}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if(total > 0) {
    return (
      <>
        <h2>statistics</h2> 
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good}/>
            <StatisticLine text={'neutral'} value={neutral}/>
            <StatisticLine text={'bad'} value={bad}/>
            <StatisticLine text={'all'} value={total}/>
            <StatisticLine text={'average'} value={average}/>
            <StatisticLine text={'positive'} value={positive + "%"}/>
          </tbody>
        </table>
      </>
    )  
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Heading text={'give feedback'}/>
      <Button text={"good"} handler={() => setGood(good + 1)}/>
      <Button text={"neutral"} handler={() => setNeutral(neutral + 1)}/>
      <Button text={"bad"}  handler={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;

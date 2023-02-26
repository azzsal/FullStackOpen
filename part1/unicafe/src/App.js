import { useState } from 'react'

const Heading = ({ text }) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const Button = ({ handler, text }) => {
  return ( 
    <button onClick={handler}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value} {text === 'positive' ? "%" : ""}</td>
      </tr>
  )
}

const Statistics = ({status}) => {
  if(status.total > 0) {
    return ( 
      <table>
        <tbody>
          <StatisticLine text={'good'} value={status.good}/>
          <StatisticLine text={'neutral'} value={status.neutral}/>
          <StatisticLine text={'bad'} value={status.bad}/>
          <StatisticLine text={'all'} value={status.total}/>
          <StatisticLine text={'average'} value={status.average}/>
          <StatisticLine text={'positive'} value={status.positive}/>
        </tbody>
      </table>
    )  
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodHandler = (value) => {
    const updatedTotal = value + neutral + bad
    setGood(value)
    setTotal(value + neutral + bad)
    setAverage((value - bad) / updatedTotal)
    setPositive((value / updatedTotal) * 100)
  }

  const neutralHandler = (value) => {
    const updatedTotal = good + value + bad
    setNeutral(value)
    setTotal(good + value + bad)
    setAverage((good - bad) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  const badHandler = (value) => {
    const updatedTotal = good + neutral + value
    setBad(value)
    setTotal(good + neutral + value)
    setAverage((good - value) / updatedTotal)
    setPositive((good / updatedTotal) * 100)
  }

  return (
    <div>
      <Heading text={'give feedback'}/>
      <Button text={"good"} handler={() => goodHandler(good + 1)}/>
      <Button text={"neutral"} handler={() => neutralHandler(neutral + 1)}/>
      <Button text={"bad"}  handler={() => badHandler(bad + 1)}/>
      <Heading text={'statistics'} />
      <Statistics status={{good, neutral, bad, total, average, positive}}/>
    </div>
  )
}

export default App;

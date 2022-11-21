import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, Setdice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, SetRollCount] = useState(0)
  const [winTime, setWinTime] = useState(Date.now())
  const [bestTime, setBestTime] = useState(parseInt(localStorage.getItem("Best Time"), 10) || false)

  function allNewDice() {
    const newArray = []
    for(let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      newArray.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()})
    }
    return newArray
  }

  function rollDice() {
    // Setdice(prevDice => {
    //   const newDice = prevDice.map(die => {
    //     die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    //   }
    //   )
    //   return newDice
    // }
    SetRollCount(prevcount => prevcount + 1)
    if (tenzies) {
      Setdice(allNewDice);
      SetRollCount(0);
      setWinTime(Date.now())
    } else {
      Setdice(oldDice => oldDice.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)} ))
    }
  }

  function HoldDice(id) {
    Setdice(oldDice => oldDice.map(die => id === die.id ? {...die, isHeld: !die.isHeld} : die ))
  }

  useEffect(() => {
    const firstDieValue = dice[0].value
    const diceCheck = dice.every(die => die.isHeld && die.value === firstDieValue)
    diceCheck ? setTenzies(true) : setTenzies(false)
  }, [dice])

  useEffect(() => {
    if (tenzies) {setWinTime(prevtime => Math.floor((Date.now() - prevtime) / 1000))};
  }, [tenzies])

  useEffect(() => {
    if (tenzies && winTime < bestTime || tenzies && bestTime === false) {
      setBestTime(winTime);
      localStorage.setItem("Best Time", bestTime)
    }
  }, [winTime])

  const diceElements = dice.map(die => <Die
    isHeld={die.isHeld}
    value={die.value}
    key={die.id}
    id={die.id}
    handleHeld={HoldDice}
    />)

    const width = "620px"
    const height = "620px"

  return (
    <div className='tenzies-game'>
      {tenzies &&
      <Confetti
        width={width}
        height={height}
      />}
      <div className='tenzies-info'>
        <h1>Tenzies</h1>
        {tenzies ?
        <p>Congratulations, you won! Click New game or refresh to play again</p>
        :
        <p>Roll until all dice are the same. Click
          each die to freeze at its current value
          between rolls
        </p>}
        <p>Number of rolls: {rollCount}</p>
        <p>{tenzies ? `Time Taken: ${winTime} seconds` : ""}</p>
        <p>{tenzies && bestTime ? `Fastest Time: ${bestTime} seconds` : ""}</p>
      </div>
      <div className='dice'>
        {diceElements}
      </div>
      <button className='btn-roll' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>

    </div>
  )
}

export default App

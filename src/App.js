import './App.css';
import Dice from './components/dice'
import {useState, useEffect} from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {

  const [allDice, setAllDice] = useState(allNewDice())
  const [tenzie, setTenzie] = useState(false)
  const [count, setCount] = useState(0)
  const [bestCount, setBestCount] = useState(JSON.parse(localStorage.getItem("Best-score")))

  function bestScore (){
    let scoreBest
    if ((bestCount === null || count < JSON.parse(localStorage.getItem("Best-score"))) && tenzie){
      localStorage.setItem("Best-score", JSON.stringify(count))
      scoreBest = JSON.parse(localStorage.getItem("Best-score"))
      setBestCount(scoreBest)
    }
    return scoreBest

  }

  function generateNewDie (){
    return {
      value: Math.floor(Math.random()*6+1),
      id: nanoid(),
      isHeld: false
    }
  }

  function allNewDice (){
    const diceObject = []
    for (let i = 0; i < 10; i++) {
      diceObject.push(generateNewDie())
    }
    return diceObject
  }

  function rerollDice (){
    if (!tenzie) {
      setAllDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setCount(prev => prev + 1)
    } else {
      setTenzie(prev => !prev)
      setAllDice(allNewDice)
      bestScore()
      setCount(0)
    }
  }

  function holdDice (id){
    setAllDice(prevDice => prevDice.map(die => {
      return die.id === id ?
              {...die, isHeld: !die.isHeld} : 
              die
    }))
  }

  /*function resetBestScore (){
    localStorage.clear()
  }*/

  useEffect(function (){
    const allHeld = allDice.every(die => die.isHeld)
    const firstValue = allDice[0].value
    const allSameValue = allDice.every(die => die.value === firstValue)
    allHeld && allSameValue ? setTenzie(prev => !prev) : console.log("")
  }, [allDice])
 
 
  function resetBestScore(){
    localStorage.clear()
    alert("refresh page")
  }

  console.log(allDice)
  
  const diceElements = allDice.map((die) => 
    <Dice 
       value={die.value}
       key={die.id}
       isHeld={die.isHeld} 
       holdDice={() => holdDice(die.id)}
    />)

  return (
    <main>
      <div className='main'>
        <div className='tenzie'>
          <div className='tenzie-container'>
            <h1 className="title">{tenzie ? "🎊 You won ! 🎊" : "Tenzies"}</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h2>Rolls number : {count} | <gap></gap> 
                Best score : {bestCount}</h2>
            <div className="dice-container">
              {diceElements}
              {tenzie && <Confetti/>}
            </div>
            <button className='roll-btn' onClick= {rerollDice}>{tenzie ? "New Game" : "Roll"}</button>
            <button className='reset-best-btn' onClick={resetBestScore}>Reset Best Score</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

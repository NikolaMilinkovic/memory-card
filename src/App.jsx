import { useState } from "react"
import "./App.css"
import MemoryGame from "./memory-game"
import GameRules from "./components/game-rules"
import Cards from "./components/cards"

function App() {

  return (
    <>
      <GameRules/>
      <Cards/>
    </>
  )
}

export default App

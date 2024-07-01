import PlayField from "./Components/PlayField/PlayField"
import styles from './App.module.css'
import { GameContextProvider } from "./Context/GameContext"
import PlayerActions from "./Components/PlayerActionsSelection/PlayerActionsSelection"
import PlayerActionsMade from "./Components/PlayerActionsMade/PlayerActionsMade"
import ProgrammActions from "./Components/ProgrammActions/ProgrammActions"
import CurrentlyHolding from "./Components/CurrentlyHolding/CurrentlyHolding"
import UsageRights from "./Components/UsageRights/UsageRights"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    console.log(["This website was programmed by Salar Alo.", "Date: 04.15.2024", "Salars Age: 15 years old", "Time spent to programm this website: 5 hours", "Framework: React"].join("\n"))
  }, [])
  return (
      <GameContextProvider>
        <CurrentlyHolding></CurrentlyHolding>
        <div className={styles.parentContainer}>
          <ProgrammActions></ProgrammActions>
          <div className={styles.container}>
            <PlayerActions></PlayerActions>
            <PlayField></PlayField>
            <PlayerActionsMade></PlayerActionsMade>
          </div>
        </div>
        <UsageRights></UsageRights>
      </GameContextProvider>
  )
}

export default App

import { useGameContext } from '../../Context/GameContext'
import styles from './ProgrammActions.module.css'

const ProgrammActions = function() {
    const { OnRunGame, running, OnSetActions, OnSetSpeed, speed, highestLevel, levelIndex, OnSetLevel } = useGameContext();
    
    return (
        <div className={styles.container}>
            <button onClick={OnRunGame} className={styles.run} disabled={running}>Ausführen</button>
            <div className={styles.innerContainer}>
                <button onClick={() => OnSetActions([])} className={styles.normal} disabled={running}>Programm zurücksetzen</button>
            </div>
            <div className={styles.innerContainer2}>
                <p>Geschwindikgkeit: {speed}</p>
                <input type='range' min={1} max={8}  value={speed} disabled={running} onChange={e => OnSetSpeed(Number(e.target.value))}/>
            </div>
            <select value={levelIndex} disabled={running} onChange={e => OnSetLevel(Number(e.target.value))} className={styles.select}>
                {Array.from({ length: highestLevel+1 }).map((_, i) => <option key={i} value={i}>Level {i+1}</option>) }
            </select>
        </div>
    )
}

export default ProgrammActions

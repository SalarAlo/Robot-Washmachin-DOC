import { useGameContext } from '../../Context/GameContext'
import { CARDINAL_DIRECTIONS } from '../../config'
import styles from './Player.module.css'
import playerImage from "/Player.png"

const Player = function() {
    const { direction } = useGameContext();
    
    return (
        <img src={playerImage} className={styles.player} style={{ transform: `rotate(${direction * 90}deg)` }}></img>
    )
}

export default Player

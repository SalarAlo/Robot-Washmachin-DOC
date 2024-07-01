import { useGameContext } from '../../Context/GameContext'
import styles from './CurrentlyHolding.module.css'

const CurrentlyHolding = function() {
    const {currentlyHolding} = useGameContext();
    if(!currentlyHolding) return null;
    return (
            <img className={styles.container} src={currentlyHolding.type} alt='item holding'/>
    )
}

export default CurrentlyHolding

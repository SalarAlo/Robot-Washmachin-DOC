import { useGameContext } from '../../Context/GameContext'
import { POSSIBLE_ACTIONS } from '../../config';
import styles from './PlayerActionsSelection.module.css'

const PlayerActions = function() {
    const { OnAddAction, running } = useGameContext();
    return (
        <div className={styles.actions}>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.ROTATE_RIGHT)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.ROTATE_RIGHT.img}></img>
            </button>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.ROTATE_LEFT)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.ROTATE_LEFT.img}></img>
            </button>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.MOVE_FORWARD)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.MOVE_FORWARD.img}></img>
            </button>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.WASHING_MACHINE)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.WASHING_MACHINE.img}></img>
            </button>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.PICKUP)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.PICKUP.img}></img>
            </button>
            <button onClick={() => OnAddAction(POSSIBLE_ACTIONS.TELEPORT)} disabled={running}>
                <img src={POSSIBLE_ACTIONS.TELEPORT.img}></img>
            </button>
        </div>
    )
}

export default PlayerActions

import styles from './PlayerActionsMade.module.css'
import { useGameContext } from '../../Context/GameContext';
import { Reorder } from 'framer-motion';
import trashImage from "/Trash.png"



const PlayerActionsMade = function() {
    const { actions, OnSetActions, OnDeleteAction, running } = useGameContext();
    return (
            <Reorder.Group className={styles.container} values={actions} onReorder={(e) => {
                OnSetActions(e);
            }}>
                {actions.map(action => {
                    return <Reorder.Item key={action.id} value={action} className={styles.item} dragListener={!running}> 
                        <div className={styles.innerContainer}>
                            <img src={action.img} className={styles.actionIcon}></img>
                            <p>{action.type}</p>
                            <button onClick={() => OnDeleteAction(action.id)}>
                                <img src={trashImage} alt='trash' className={styles.delete} />
                            </button>
                        </div> 
                    </Reorder.Item>
                })}
                {actions.length != 0 && <p>Dieses Programm benötigt {actions.length} Züge</p>}
            </Reorder.Group>
    )
}

export default PlayerActionsMade

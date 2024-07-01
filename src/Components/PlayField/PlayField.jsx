import { useGameContext } from "../../Context/GameContext"
import { SIZE_X, SIZE_Y } from "../../config"
import WashingMachine from "/WashingMachine.png"
import Teleporter from "/Teleporter.png"
import Block from "/Block.png"
import styles from './PlayField.module.css'
import Player from "../Player/Player"

const PlayField = function() {
    const { playerPos, washingMachine, laundry, teleportation, blocks } = useGameContext();
    return (
        <table className={styles.table}>
            {Array.from({ length: SIZE_Y }).map((_, i) => {
                return <tr className={styles.column} key={i}>
                    {Array.from({ length: SIZE_X }).map((_, j) => {
                        const isPlayerPos = playerPos.x == j && playerPos.y == i;
                        const isWashingMachine =  washingMachine.x == j && washingMachine.y == i;
                        const laundrySet = laundry.find(laund => laund.pos.x == j && laund.pos.y == i);
                        const isBlock = blocks.some(block => block.x == j && block.y == i)
                        const isTeleport = teleportation.some(teleporter => teleporter.x == j && teleporter.y == i)
                        const isOuterField = i == 0 || i == SIZE_Y-1 || j == 0 || j == SIZE_X-1;
                        const isBottom = i == SIZE_Y-1;
                        const isLeft = j == SIZE_X-1;
                        
                        return <>
                            <td key={j} className={`${styles.field} ${isOuterField ? styles.outerField : ""}`}>
                                {isPlayerPos &&  <Player />}
                                {isWashingMachine && <img src={WashingMachine} className={`${styles.washingMachine} ${isPlayerPos ? styles.abs : ""}`}></img>}
                                {laundrySet  && <img src={laundrySet.type} className={`${styles.washingMachine} ${isPlayerPos ? styles.abs : ""}`}></img>}
                                {isTeleport  && <img src={Teleporter} className={`${styles.washingMachine} ${isPlayerPos ? styles.abs : ""}`}></img>}
                                {isBlock && <img src={Block} className={`${styles.washingMachine} ${isPlayerPos ? styles.abs : ""}`}></img>}
                                {isBottom && <p className={styles.miniInfoBottom}>{j+1}</p>} 
                                {isLeft && <p className={styles.miniInfoLeft}>{[..."abcdefghijklmnopqrstuwvxyz"][i]}</p>}
                            </td>
                        </>
                        }
                    )
                    }
                </tr>
            })}
        </table>
    )
}

export default PlayField

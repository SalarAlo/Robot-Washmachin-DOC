import { useState } from 'react'
import styles from './UsageRights.module.css'

const UsageRights = function() {
    const [open, setOpen] = useState(false);

    return (
        
        <div className={styles.rights}>
            {
                open ? 
                <>
                    Urheber: Salar Alo
                    <br></br>
                    Nutzungsrecht: Martin Jakobs
                    <br></br> 
                    Programmierung: Salar Alo
                </>
                : <button onClick={() => setOpen(true)} className={styles.open}>?</button>
            }
        </div>
        
    )
}

export default UsageRights

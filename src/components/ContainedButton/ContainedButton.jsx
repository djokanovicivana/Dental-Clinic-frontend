import * as React from 'react';
import styles from "./ContainedButton.module.css"
export default function ContainedButton(props){
    return(
        <div className={styles.buttonField}>
            <button className={styles.button}>{props.text}</button>
        </div>
    )
}

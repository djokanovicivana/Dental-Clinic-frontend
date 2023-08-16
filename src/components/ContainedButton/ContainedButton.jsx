import * as React from 'react';
import styles from "./ContainedButton.module.css"
export default function ContainedButton(props){
    return(
        <div className={styles.buttonField}>
            <button className={props.module}>{props.text}</button>
        </div>
    )
}

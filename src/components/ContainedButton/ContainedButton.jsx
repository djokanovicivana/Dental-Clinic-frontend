import * as React from 'react';
import styles from "./ContainedButton.module.css"
export default function ContainedButton(props){
    return(
        <div className={styles.buttonField}>
            <button className={props.module} onClick={props.handleClick}>{props.text}</button>
        </div>
    )
}

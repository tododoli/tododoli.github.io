import React, {useEffect, useState} from 'react'
import styles from './Card.module.css'
import {API} from "../../API/API";
import TextArea from 'react-textarea-autosize'


const Options = (props) => {
    return <div className={styles.options}>
        <div className={styles.icon + ' ' + props.colorF} onClick={props.editMode ? props.saveFun : props.editFun}><i
            className={!props.editMode ? 'fas fa-pen' : 'fas fa-check'}/> {props.editMode ? 'Save' : 'Edit'}</div>
        <div className={styles.icon + ' ' + props.colorF} onClick={props.deleteFun}><i className='fas fa-trash'/> Delete
        </div>
    </div>
}

const Card = (props) => {
    let [isOptsShown, showOpts] = useState(false)
    let [editMode, setEditMode] = useState(false)
    let [newText, setNewText] = useState(props.text)

    const hideOptions = () => {
        showOpts(false)
    }
    const markTask = () => {
        API.editTask(props.list, props.id, {text: props.text, done: !props.done}).then(
            (r) => {
                props.update(props.list)
            }
        )
    }
    const deleteTask = () => {
        API.deleteTask(props.list, props.id).then(
            r => {
                props.update(props.list)
            }
        )
    }

    const listenKey = (e) => {
        if (e.key === 'Enter')  {
            e.preventDefault()
            saveTask()
        }
    }

    const saveTask = () => {
        API.editTask(props.list, props.id, {text: newText, done: props.done}).then(
            (r) => {
                setEditMode(false)
                props.update(props.list)
            }
        )
    }
    return <div className={`${styles.card} ${props.done ? styles.done : styles.active}`}>
        <div className={styles.grid}>
            <div className={styles.btn + ' ' + props.colorF}> {!props.done ?
                <i className='far fa-circle' onClick={markTask}/> :
                <i className='fas fa-check-circle' onClick={markTask}/>}</div>
            <div
                className={props.done ? styles.textDone : styles.textActive}>{editMode ?
                <input className={styles.input} autoFocus={true} value={newText} onChange={(e) => {
                    setNewText(e.target.value)
                }} onKeyPress={listenKey}/> : props.text}</div>
            <div className={styles.btn + ' ' + props.colorF}><i
                className={isOptsShown ? 'fas fa-chevron-circle-up' : 'fas fa-chevron-circle-down'}
                onClick={() => showOpts(!isOptsShown)}/></div>
        </div>
        {isOptsShown && <Options
            colorF={props.colorF} hideFun={hideOptions} markFun={markTask}
            deleteFun={deleteTask} editMode={editMode}
            editFun={() => setEditMode(true)} saveFun={saveTask}/>}
    </div>
}
export default Card
import React, {useState} from 'react'
import styles from './Card.module.css'
import {API} from "../../API/API";
import Linkify from "react-linkify"

const Options = (props) => {
    return <div className={styles.options}>
        {props.editMode ?
            <div className={styles.icon + ' ' + props.colorF} onClick={props.saveFun}>
                <i
                    className={'fas fa-check'}/> {'Save'}
            </div>
            :
            <div className={styles.icon + ' ' + props.colorF} onClick={props.editFun}>
                <i
                    className={'fas fa-pen'}/> {'Edit'}
            </div>
        }
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
            () => {
                props.update(props.list)
            }
        )
    }
    const deleteTask = () => {
        API.deleteTask(props.list, props.id).then(
            () => {
                props.update(props.list)
            }
        )
    }

    const listenKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            saveTask()
        }
    }

    const saveTask = () => {
        API.editTask(props.list, props.id, {text: newText, done: props.done}).then(
            () => {
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
                className={props.done ? styles.textDone : styles.textActive}>{
                editMode
                    ?
                    <input onKeyPress={listenKey} className={styles.input}
                           autoFocus={true} value={newText}
                           onChange={(e) => {
                               setNewText(e.target.value)
                           }}/>
                    :
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                            {decoratedText}
                        </a>
                    )}>
                        <span>{props.text}</span>
                    </Linkify>}
            </div>
            <div className={styles.btn + ' ' + props.colorF}><i
                id={styles.menuBtn}
                className={isOptsShown ? 'fas fa-ellipsis-h' : 'fas fa-ellipsis-h'}
                onClick={() => showOpts(!isOptsShown)}/></div>
        </div>
        {isOptsShown && <Options
            colorF={props.colorF} hideFun={hideOptions} markFun={markTask}
            deleteFun={deleteTask} editMode={editMode}
            editFun={() => setEditMode(true)} saveFun={saveTask}/>}
    </div>
}
export default Card
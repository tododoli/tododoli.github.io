import React, {useEffect, useState} from 'react'
import styles from './List.module.css'
import Card from "../card/Card";
import {NavLink, useParams} from 'react-router-dom'
import {API} from "../../API/API";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QR from "../QR";
import {checkColor, setBackColor, setForeColor} from "../../utils/Colors";

const Header = (props) => {
    let [isCopied, setCopied] = useState(false)
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    let [isPinned, setPinned] = useState(false)
    let [isQRShown, showQR] = useState(false)

    useEffect(
        () => {
            let pins = JSON.parse(localStorage.getItem('pins'))
            setNewTitle(props.title)
            setPinned(pins !== null && pins.includes(props.listId))
        }, [props.listId, isPinned, props.title]
    )

    const pinList = (add) => {
        let pins = JSON.parse(localStorage.getItem('pins'))
        let key = localStorage.getItem('syncKey')

        if (pins === null) pins = []

        if (pins.includes(props.listId)) {
            let index = pins.indexOf(props.listId);
            pins.splice(index, 1);
        }
        if (add) {
            pins.unshift(props.listId) //> 100 && pins.pop() //I'm not sure if I need to limit pins
            setPinned(true)
        } else
            setPinned(false)

        localStorage.setItem('pins', JSON.stringify(pins))
        key !== null && API.setPins(key, pins)
        props.update(props.listId)
    }

    const rename = () => {
        API.renameList(props.listId, newTitle === '' ? props.title : newTitle).then(() => {
            setEditMode(false)
            props.update(props.listId)
        })
    }


    return <div className={styles.header}>
        <div className={styles.titleSection}>
            <div className={styles.headerTitle}>
                {editMode
                    ?
                    <input autoFocus={true} placeholder={'New title...'} onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}
                           value={newTitle}/>
                    :
                    <div className={styles.title}><NavLink className={styles.link} style={setForeColor(props.color)}
                                                           to={'/'}>{'ToDoDoLi:'}</NavLink>{
                        <span onClick={() => setEditMode(true)} style={{cursor: "pointer"}}>{props.title}</span> || ''}
                    </div>
                }
            </div>
            {editMode && <div className={styles.titleButton}>
                <i
                    className={'fas fa-check'}
                    onClick={rename}/>
            </div>}
            {!editMode && <div className={styles.titleButton} onClick={() => {
                pinList(!isPinned);
            }}>
                <i
                    className={isPinned ? 'fas fa-star' : 'far fa-star'}
                />
            </div>}
        </div>
        <div className={styles.copySection}>
            <CopyToClipboard text={props.link} onCopy={() => setCopied(true)}>
                <div className={styles.copyLink}>
                    <i className={isCopied ? 'fas fa-check' : 'fas fa-link'}/>
                </div>
            </CopyToClipboard>
        </div>
        <div className={styles.copySection}>
            <div className={styles.copyLink} onClick={() => showQR(true)}>
                <i className={'fas fa-qrcode'}/>
            </div>
            {isQRShown && <QR link={props.link} hideFun={() => showQR(false)}/>}
        </div>
    </div>
}

const NewCard = (props) => {
    let [cardText, setCardText] = useState('')
    const updateInput = (e) => {
        setCardText(e.target.value)
    }

    const onAdd = () => {
        if (cardText === '') return
        props.addTask(cardText)
        setCardText('')
    }
    const listenKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            document.activeElement.blur()
            onAdd()
        }
    }

    return <div className={styles.inputWrapper} id={'addCard'}>
        <input autoComplete="off" id={'input'} placeholder='New task...' className={styles.input} value={cardText}
               onChange={updateInput} onKeyPress={listenKey}/>
        <div className={styles.addButton} id={'button'}
             style={cardText !== '' ? {opacity: 1, ...setForeColor(props.color)} : {opacity: .6, ...setForeColor(props.color)}}
             onClick={onAdd}><i className='fas fa-plus-circle'/></div>
    </div>
}

const HiddenItems = (props) => {

    return <div
        style={{display: 'flex', justifyContent: 'center', ...setForeColor(props.color)}}
    >
        <div className={styles.hiddenWrapper}
             onClick={props.hidden ? props.expandDone : props.hideDone}>
            <div className={styles.ic} style={setForeColor(props.color)}>
                <i className={props.hidden ? 'fas fa-chevron-down' : 'fas fa-chevron-up'}/>
            </div>
            <div className={styles.label}>{!props.hidden ? 'Hide checked' : `${props.hiddenCount} item${props.hiddenCount === 1 ? '' : 's'} done`}</div>
        </div>
    </div>
}

const List = () => {
    let {id} = useParams()
    let [items, setItems] = useState({})
    let [title, setTitle] = useState('')
    let [color, setColor] = useState(checkColor(''))
    let [link, setLink] = useState('')
    let [isHidden, setHidden] = useState(true)

    useEffect(
        () => {
            setLink(window.location.href)
            window.scrollTo({top: 0, behavior: "smooth"})

        }, []
    )

    useEffect(
        () => {
            fetchList(id)
        }, [id]
    )

    const updateHistory = () => {
        let history = JSON.parse(localStorage.getItem('history'))
        let pins = JSON.parse(localStorage.getItem('pins'))
        if (pins === null) pins = []
        if (history === null) history = []

        if (history.includes(id)) {
            let index = history.indexOf(id);
            history.splice(index, 1);

        }
        if (!pins.includes(id)) history.unshift(id) > 10 && history.pop()
        else {
            let index = pins.indexOf(id);
            pins.splice(index, 1);
            pins.unshift(id)
            localStorage.setItem('pins', JSON.stringify(pins))
        }
        localStorage.setItem('history', JSON.stringify(history))

    }


    const fetchList = (id) => {
        API.fetchList(id).then(r => {
            updateHistory()

            if (r == null) return
            setItems(r.items)
            setTitle(r.name)
            setColor(checkColor(r.color))
        })
    }
    const addTask = (text) => {
        document.querySelector('#input').focus()

        API.addTask(id, text).then(
            (resp) => {
                resp.name && fetchList(id)
            }
        )
    }
    let doneCount = 0;
    const doneItemsComponents = items ? Object.entries(items).map(([key, item]) => {
        if (item.done) {
            doneCount++
            return <Card color={color} done={item.done} text={item.text} key={key} id={key} list={id}
                         update={fetchList}/>
        }
    }) : null
    const activeItemsComponents = items ? Object.entries(items).map(([key, item]) => {
        if (!item.done) return <Card color={color} done={item.done} text={item.text} key={key} id={key} list={id}
                                     update={fetchList}/>
    }) : null


    return <div className={styles.background} style={setBackColor(color)}>
        <Header title={title} listId={id} update={fetchList} link={link} color={color}/>
        <div className={styles.list}>
            {doneCount === 0 || <HiddenItems expandDone={() => setHidden(false)}
                                             hidden={isHidden}
                                             hideDone={() => setHidden(true)}
                                             hiddenCount={doneCount}
                                             color={color}/>}
            {isHidden || doneItemsComponents}
            {activeItemsComponents}
            <NewCard addTask={addTask} color={color}/>
            <div className={styles.pseudoExtender}/>
        </div>
    </div>
}
export default List

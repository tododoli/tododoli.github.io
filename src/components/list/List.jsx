import React, {useEffect, useState} from 'react'
import styles from './List.module.css'
import Card from "../card/Card";
import {NavLink, useParams} from 'react-router-dom'
import {API} from "../../API/API";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import colors from './../../Colors.module.css'

const Header = (props) => {
    let [isCopied, setCopied] = useState(false)
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    useEffect(
        ()=>{
            setNewTitle(props.title)
        }, [props.title]
    )

    const rename = () => {
        API.renameList(props.listId, newTitle === '' ? props.title : newTitle).then(r => {
            setEditMode(false)
            props.update(props.listId)
        })
    }


    return <div className={styles.header}>
        <div className={styles.titleSection}>
            <div className={styles.headerTitle}>
                {editMode
                    ?
                    <input autoFocus={true} onSubmit={rename} placeholder={'New title...'} onChange={(e) => {setNewTitle(e.target.value)}}
                           value={newTitle}/>
                           :
                    <div className={styles.title}><NavLink className={styles.link+' '+props.color} to={'/'}>{'ToDoDoLi:'}</NavLink>{<span>{props.title}</span> || ''}</div>
                }
            </div>
            <div className={styles.titleButton}>
                <i
                    className={editMode ? 'fas fa-check' : 'fas fa-pen'}
                    onClick={editMode ? rename : () => setEditMode(true)}/>
            </div>
        </div>
        <div className={styles.copySection}>
            <CopyToClipboard text={props.link} onCopy={() => setCopied(true)}>
                <div className={styles.copyLink}>
                    <i className={isCopied ? 'fas fa-check' : 'fas fa-link'}/>
                </div>
            </CopyToClipboard>
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
        document.querySelector('#input').focus()

    }
    const listenKey = (e) => {
        if (e.key === 'Enter')  {
            e.preventDefault()
            onAdd()
        }
    }

    return <div className={styles.inputWrapper} id={'addCard'}>
        <input id={'input'} placeholder='New task...' className={styles.input} value={cardText}
                  onChange={updateInput} onKeyPress={listenKey}/>
        <div className={styles.addButton+' '+props.color} style={cardText !=='' ? {opacity: 1} : {opacity: .6}} onClick={onAdd}><i className='fas fa-plus-circle'/></div>
    </div>
}

const List = () => {
    let {id} = useParams()
    let [items, setItems] = useState({})
    let [title, setTitle] = useState('')
    let [colorF, setColorF] = useState(colors.default) // Yeah I know how weird it is
    let [colorB, setColorB] = useState(colors.defaultB)
    let [link, setLink] = useState('')

    useEffect(
        ()=>{
            setLink(window.location.href)
            window.scrollTo({top: 0, behavior: "smooth"})
        }, []
    )

    useEffect(
        () => {
            fetchList(id)
        }, [id]
    )
    const fetchList = (id) => {
        API.fetchList(id).then(r => {
            setItems(r.items)
            setTitle(r.name)
            switch (r.color) {
                case 'red':
                    setColorB(colors.redB)
                    setColorF(colors.red)
                    break
                case 'blue':
                    setColorB(colors.blueB)
                    setColorF(colors.blue)
                    break
                case 'green':
                    setColorB(colors.greenB)
                    setColorF(colors.green)
                    break
                case 'dark':
                    setColorB(colors.darkB)
                    setColorF(colors.dark)
                    break
                default:
                    setColorB(colors.defaultB)
                    setColorF(colors.default)
            }
        })
    }
    const addTask = (text) => {
        API.addTask(id, text).then(
            (resp) => {
                resp.name && fetchList(id)
                document.querySelector('#addCard').scrollIntoView({behavior: "auto"})
            }
        )
    }

    const doneItemsComponents = items ? Object.entries(items).map(([key, item]) => {
        if (item.done) return <Card colorF={colorF} done={item.done} text={item.text} key={key} id={key} list={id} update={fetchList}/>
    }) : null
    const activeItemsComponents = items ? Object.entries(items).map(([key, item]) => {
        if (!item.done) return <Card colorF={colorF} done={item.done} text={item.text} key={key} id={key} list={id} update={fetchList}/>
    }) : null

    return <div className={`${styles.background} ${colorB}`}>
        <Header title={title} listId={id} update={fetchList} link={link} color={colorF}/>
        <div className={styles.list}>
            {doneItemsComponents}
            {activeItemsComponents}
            <NewCard addTask={addTask} color={colorF}/>
            <div className={styles.pseudoExtender}/>
        </div>
    </div>
}
export default List
import React, {useEffect, useState} from 'react'
import styles from './Home.module.css'
import colors from '../../Colors.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {API} from "../../API/API";


const Home = () => {

    let [color, setColor] = useState('red')
    let [title, setTitle] = useState('')
    let [link, setLink] = useState('')

    const createList = () => {
        API.createList(title !== '' ? title : 'New list', color).then(
            (r) => {
                setLink('/' + r.name)
            }
        )
    }
    const listenKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            createList()
        }
    }

    if (link !== '') return <Redirect to={link}/>
    return <div className={styles.wrapper}>
        <div>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input onKeyPress={listenKey} placeholder={'New List...'} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.colorsSection}>
                    <div className={styles.colors}>
                        <div className={(color === 'red' ? styles.colorActive : styles.color) + ' ' + colors.redB}
                             onClick={() => setColor('red')}/>
                        <div className={(color === 'green' ? styles.colorActive : styles.color) + ' ' + colors.greenB}
                             onClick={() => setColor('green')}/>
                        <div className={(color === 'blue' ? styles.colorActive : styles.color) + ' ' + colors.blueB}
                             onClick={() => setColor('blue')}/>
                        <div className={(color === 'dark' ? styles.colorActive : styles.color) + ' ' + colors.darkB}
                             onClick={() => setColor('dark')}/>
                    </div>
                </div>
                <div className={styles.buttonSection}>
                    <div className={styles.button} onClick={createList}>Create List</div>
                </div>
            </div>
            <History/>
        </div>
    </div>
}

const History = (props) => {

    let [items, setItems] = useState([])
    let [pins, setPins] = useState([])
    useEffect(
        () => {
            getPins()
            getHistory()
        }, []
    )
    const getPins = () => {
        let pins = localStorage.getItem('pins')
        if (pins != null)
            setPins(JSON.parse(pins))
    }

    const getHistory = () => {
        let history = localStorage.getItem('history')
        if (history != null)
            setItems(JSON.parse(history))
    }

    let historyItems = items.map(
        (el) => {
            return <ListCard id={el} key={el} pin={false}/>
        }
    )
    let pinnedItems = pins.map(
        (el) => {
            return <ListCard id={el} key={el} pin={true}/>
        }
    )

    return <div className={styles.history}>
        {pinnedItems}
        {historyItems}
    </div>
}

const ListCard = (props) => {

    let [listProps, setListProps] = useState({})

    useEffect(() => {
        getListProps()
    }, [props.id])

    const parseColor = (colorString) => {
        switch (colorString) {
            case 'red':
                return colors.red
            case 'green':
                return colors.green
            case 'dark':
                return colors.dark
            case 'blue':
                return colors.blue
            default:
                return colors.default
        }
    }

    const getListProps = () => {
        API.fetchList(props.id).then(
            (r) => {
                if (r != null)
                    setListProps({name: r.name, color: parseColor(r.color)})
                else
                    setListProps({name: `It's a bug, lol`, color: colors.default})
            }
        )
    }

    return <NavLink to={`/${props.id}`}
                    style={{textDecoration: "none", color: "black"}}>
        <div className={styles.itemWrapper} style={listProps.name ? {opacity: 1}:{opacity: 0}}>
            <div className={styles.circle + ' ' + listProps.color}>
                {listProps.color && <i className={props.pin ? 'fas fa-star': 'fas fa-circle'}/>}
            </div>
            <div className={styles.listName}>{listProps.name || ''}</div>
        </div>
    </NavLink>
}

export default Home
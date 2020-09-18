import React, {useEffect, useState} from 'react'
import styles from './Home.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {API} from "../../API/API";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import QR from "../QR";
import {checkColor, getFGStyle, palette} from "../../utils/Colors";


const Home = () => {

    let [color, setColor] = useState(palette[0])
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

    const colors = palette.map(
        item => {
            return <div className={(color === item ? styles.colorActive : styles.color)}
                        style={{backgroundColor: item}}
                        onClick={() => setColor(item)}/>
        }
    )
    if (link !== '') return <Redirect to={link}/>
    return <div className={styles.wrapper}>
        <div>
            <SyncParams/>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input onKeyPress={listenKey} placeholder={'New List...'} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.colorsSection}>
                    <div className={styles.colors}>
                        {colors}
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
    let [historyLoaded, setHistoryLoaded] = useState(false)

    useEffect(
        () => {
            getPins()
            getHistory()
        }, []
    )
    const getPins = () => {
        let key = localStorage.getItem('syncKey')
        if (key != null) {
            API.fetchPins(key).then(
                r => {
                    if (r != null) {
                        setPins(r.pins)
                        localStorage.setItem('pins', JSON.stringify(r.pins))
                    } else {
                        setPins([])
                        localStorage.setItem('pins', JSON.stringify([]))
                    }
                }
            )
        } else {
            let pins = localStorage.getItem('pins')
            if (pins != null)
                setPins(JSON.parse(pins))
        }
    }

    const getHistory = () => {
        let history = localStorage.getItem('history')
        if (history != null)
            setItems(JSON.parse(history))
        setTimeout(() => {
            setHistoryLoaded(true)
        }, 1000)
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
        <ClearButton setItems={setItems} historyLoaded={historyLoaded} hasHistory={historyItems.length !== 0}/>
    </div>
}

const ListCard = (props) => {

    let [listProps, setListProps] = useState({})

    useEffect(() => {
        getListProps()
    }, [props.id])


    const getListProps = () => {
        API.fetchList(props.id).then(
            (r) => {
                if (r != null)
                    setListProps({name: r.name, color: checkColor(r.color)})
                else
                    setListProps({name: `It's a bug ;)`, color: checkColor('')})
            }
        )
    }

    return <NavLink to={`/${props.id}`}
                    style={{textDecoration: "none", color: "black"}}>
        <div className={styles.itemWrapper} style={listProps.name ? {opacity: 1} : {opacity: 0}}>
            <div className={styles.circle} style={getFGStyle(listProps.color)}>
                {listProps.color && <i className={props.pin ? 'fas fa-star' : 'fas fa-circle'}/>}
            </div>
            <div className={styles.listName}>{listProps.name || ''}</div>
        </div>
    </NavLink>
}

const SyncParams = () => {
    let [isSynced, setSynced] = useState(false)
    let [syncKey, setSyncKey] = useState(null)
    let [link, setLink] = useState('')
    let [isCopied, setCopied] = useState(false)
    let [isQRShown, showQR] = useState(false)
    let [isHintShown, showHint] = useState(false)

    useEffect(() => {
        checkSync()
    }, [isSynced])

    const checkSync = () => {
        let storedKey = localStorage.getItem('syncKey')
        setSynced(storedKey != null)
        setSyncKey(storedKey)
        setLink(generateLink)
    }

    const generateLink = () => {
        return window.location.href + 'sync/' + syncKey
    }
    const createUser = () => {
        API.createUser().then(
            r => {
                if (r != null) {
                    let localPins = JSON.parse(localStorage.getItem('pins'))
                    API.setPins(r.name, localPins).then(() => {
                        setSyncKey(r.name)
                        setSynced(true)
                        setLink(generateLink())
                        localStorage.setItem('syncKey', r.name)
                    })
                }
            }
        )
    }

    return <div className={styles.syncWrapper} style={isHintShown || isQRShown ? {} : {opacity: .6}}>
        {
            isSynced ?
                <div className={styles.isSynced}>
                    <div className={styles.syncedOptions}>
                        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                            <div className={styles.btn}><i
                                className={isCopied ? 'fas fa-check' : 'fas fa-link'}/>{isCopied ? 'Copied' : 'Link'}
                            </div>
                        </CopyToClipboard>
                        <div className={styles.btn} onClick={() => showQR(true)}><i className={'fas fa-qrcode'}/>QR
                        </div>
                        {isQRShown && <QR link={link} hideFun={() => showQR(false)}/>}
                        <div className={styles.btn} onClick={() => showHint(!isHintShown)}><i
                            className={isHintShown ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}/>Hint
                        </div>
                    </div>
                    {isHintShown &&
                    <div className={styles.hint}>Your pinned lists are cloud stored. You can sync a new device using the
                        link below. <NavLink style={{color: 'black'}} to={'/nosync'}>Disable sync</NavLink></div>}
                </div>


                :
                <div className={styles.isSynced}>
                    <div className={styles.localOptions}>

                        <div className={styles.btn} onClick={createUser}><i className={'fas fa-cloud'}/>New Cloud</div>

                        <div className={styles.btn} onClick={() => showHint(!isHintShown)}><i
                            className={isHintShown ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}/>Hint
                        </div>
                    </div>
                    {isHintShown &&
                    <div className={styles.hint}>This devise shows your local pins. Start with creating a Cloud for
                        pins. You'll be able to sync your connected devices</div>}
                </div>
        }
    </div>
}

const ClearButton = (props) => {
    let [cleared, setCleared] = useState(false)
    let [temp, setTemp] = useState([])
    let [opacity, setOpacity] = useState(1)
    let [currentTimer, setCurrentTimer] = useState(0)

    const saveHistory = () => {
        let history = JSON.parse(localStorage.getItem('history'))
        setTemp(history)
    }

    const restoreHistory = () => {
        clearTimeout(currentTimer)
        localStorage.setItem('history', JSON.stringify(temp))
        props.setItems(temp)
        setCleared(false)
        setOpacity(1)
    }

    const clearHistory = () => {
        saveHistory()
        setCleared(true)
        localStorage.removeItem('history')
        props.setItems([])
        setCurrentTimer(setTimeout(() => {
            setOpacity(.5)
            setCurrentTimer(setTimeout(() => {
                setOpacity(0)
                setCurrentTimer(setTimeout(() => setCleared(false),
                    500))
            }, 3500))
        }, 2000))

    }
    if (!props.hasHistory && !cleared) return null

    return <div className={styles.clearWrapper}
                onClick={cleared ? restoreHistory : clearHistory}
                style={props.historyLoaded ? {opacity: opacity} : {opacity: 0}}>

        {cleared ? 'Undo' : 'Clear history'}
    </div>
}

export default Home
